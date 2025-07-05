     const API_BASE_URL = 'http://localhost:9999';
        let currentUsers = [];
        let userToDelete = null;

        $(document).ready(function() {
            loadUsers();
            loadUsersForComplaint();
            setupEventListeners();
        });

        function setupEventListeners() {
            // Tab navigation
            $('.nav-tab').click(function() {
                $('.nav-tab').removeClass('active');
                $('.tab-content').removeClass('active');
                $(this).addClass('active');
                $('#' + $(this).data('tab')).addClass('active');
            });

            $('#add-user-form').submit(function(e) {
                e.preventDefault();
                addUser();
            });

            $('#edit-user-form').submit(function(e) {
                e.preventDefault();
                updateUser();
            });

            $('#complaint-form').submit(function(e) {
                e.preventDefault();
                submitComplaint();
            });

            $('.close').click(function() {
                $(this).closest('.modal').hide();
            });

            $('#cancel-delete').click(function() {
                $('#delete-modal').hide();
            });

            $('#confirm-delete').click(function() {
                deleteUser(userToDelete);
                $('#delete-modal').hide();
            });

            $(window).click(function(e) {
                if ($(e.target).hasClass('modal')) {
                    $('.modal').hide();
                }
            });
        }

        function loadUsers() {
            $('#users-loading').show();
            $('#users-content').hide();
            
            $.ajax({
                url: `${API_BASE_URL}/users`,
                method: 'GET',
                success: function(data) {
                    currentUsers = data;
                    displayUsers(data);
                    $('#users-loading').hide();
                    $('#users-content').show();
                },
                error: function(xhr, status, error) {
                    $('#users-loading').hide();
                    showAlert('users-content', 'Error loading users: ' + error, 'error');
                }
            });
        }

        function displayUsers(users) {
            const tbody = $('#users-tbody');
            tbody.empty();
            
            users.forEach(user => {
                const row = `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.phone}</td>
                        <td>
                            <button class="btn btn-warning" onclick="editUser(${user.id})">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="btn btn-danger" onclick="confirmDelete(${user.id})">
                                <i class="fas fa-trash"></i> Delete
                            </button>
                        </td>
                    </tr>
                `;
                tbody.append(row);
            });
        }

        function addUser() {
            const formData = {
                name: $('#user-name').val(),
                email: $('#user-email').val(),
                phone: $('#user-phone').val(),
                address: $('#user-address').val()
            };

            $.ajax({
                url: `${API_BASE_URL}/users`,
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(formData),
                success: function(data) {
                    showAlert('add-user-alert', 'User added successfully!', 'success');
                    $('#add-user-form')[0].reset();
                    loadUsers();
                    loadUsersForComplaint();
                },
                error: function(xhr, status, error) {
                    showAlert('add-user-alert', 'Error adding user: ' + error, 'error');
                }
            });
        }

        function editUser(userId) {
            const user = currentUsers.find(u => u.id === userId);
            if (user) {
                $('#edit-user-id').val(user.id);
                $('#edit-user-name').val(user.name);
                $('#edit-user-email').val(user.email);
                $('#edit-user-phone').val(user.phone);
                $('#edit-user-address').val(user.address);
                $('#edit-user-modal').show();
            }
        }

        function updateUser() {
            const userId = $('#edit-user-id').val();
            const formData = {
                name: $('#edit-user-name').val(),
                email: $('#edit-user-email').val(),
                phone: $('#edit-user-phone').val(),
                address: $('#edit-user-address').val()
            };

            $.ajax({
                url: `${API_BASE_URL}/users/${userId}`,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(formData),
                success: function(data) {
                    showAlert('edit-user-alert', 'User updated successfully!', 'success');
                    setTimeout(() => {
                        $('#edit-user-modal').hide();
                        loadUsers();
                        loadUsersForComplaint();
                    }, 1500);
                },
                error: function(xhr, status, error) {
                    showAlert('edit-user-alert', 'Error updating user: ' + error, 'error');
                }
            });
        }

        function confirmDelete(userId) {
            userToDelete = userId;
            $('#delete-modal').show();
        }

        function deleteUser(userId) {
            $.ajax({
                url: `${API_BASE_URL}/users/${userId}`,
                method: 'DELETE',
                success: function(data) {
                    loadUsers();
                    loadUsersForComplaint();
                    showAlert('users-content', 'User deleted successfully!', 'success');
                },
                error: function(xhr, status, error) {
                    showAlert('users-content', 'Error deleting user: ' + error, 'error');
                }
            });
        }

        function loadUsersForComplaint() {
            $.ajax({
                url: `${API_BASE_URL}/users`,
                method: 'GET',
                success: function(data) {
                    const select = $('#complaint-user');
                    select.find('option:not(:first)').remove();
                    
                    data.forEach(user => {
                        select.append(`<option value="${user.id}">${user.name} (${user.email})</option>`);
                    });
                },
                error: function(xhr, status, error) {
                    console.error('Error loading users for complaint:', error);
                }
            });
        }
        function submitComplaint() {
            const formData = {
                userId: parseInt($('#complaint-user').val()),
                title: $('#complaint-title').val(),
                description: $('#complaint-description').val(),
                status: $('#complaint-status').val()
            };

            $.ajax({
                url: `${API_BASE_URL}/complaints`,
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(formData),
                success: function(data) {
                    showAlert('complaint-alert', 'Complaint submitted successfully!', 'success');
                    $('#complaint-form')[0].reset();
                },
                error: function(xhr, status, error) {
                    showAlert('complaint-alert', 'Error submitting complaint: ' + error, 'error');
                }
            });
        }

        function showAlert(containerId, message, type) {
            const alertClass = type === 'success' ? 'alert-success' : 'alert-error';
            const alertHtml = `<div class="alert ${alertClass}">${message}</div>`;
            
            $(`#${containerId}`).html(alertHtml);
  
            setTimeout(() => {
                $(`#${containerId}`).empty();
            }, 5000);
        }