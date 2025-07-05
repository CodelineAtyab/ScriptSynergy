 const API_BASE_URL = 'http://localhost:9999';
        let allComplaints = [];
        let allUsers = [];
        let filteredComplaints = [];
        let complaintToDelete = null;

        // Initialize the application
        $(document).ready(function() {
            loadUsers();
            loadComplaints();
            setupEventListeners();
        });

        // Setup event listeners
        function setupEventListeners() {
            // Filter controls
            $('#filter-user, #filter-status').change(function() {
                applyFilters();
            });

            $('#filter-title').on('input', function() {
                applyFilters();
            });

            $('#clear-filters').click(function() {
                clearFilters();
            });

            $('#refresh-complaints').click(function() {
                loadComplaints();
            });

            // Edit complaint form
            $('#edit-complaint-form').submit(function(e) {
                e.preventDefault();
                updateComplaint();
            });

            // Modal controls
            $('.close').click(function() {
                $(this).closest('.modal').hide();
            });

            $('#cancel-delete-complaint').click(function() {
                $('#delete-complaint-modal').hide();
            });

            $('#confirm-delete-complaint').click(function() {
                deleteComplaint(complaintToDelete);
                $('#delete-complaint-modal').hide();
            });

            // Close modal when clicking outside
            $(window).click(function(e) {
                if ($(e.target).hasClass('modal')) {
                    $('.modal').hide();
                }
            });
        }

        // Load all users
        function loadUsers() {
            $.ajax({
                url: `${API_BASE_URL}/users`,
                method: 'GET',
                success: function(data) {
                    allUsers = data;
                    populateUserDropdowns();
                },
                error: function(xhr, status, error) {
                    console.error('Error loading users:', error);
                }
            });
        }

        // Populate user dropdowns
        function populateUserDropdowns() {
            const filterSelect = $('#filter-user');
            const editSelect = $('#edit-complaint-user');
            
            filterSelect.find('option:not(:first)').remove();
            editSelect.find('option:not(:first)').remove();
            
            allUsers.forEach(user => {
                const option = `<option value="${user.id}">${user.name} (${user.email})</option>`;
                filterSelect.append(option);
                editSelect.append(option);
            });
        }

        // Load all complaints
        function loadComplaints() {
            $('#complaints-loading').show();
            $('#complaints-content').hide();
            
            $.ajax({
                url: `${API_BASE_URL}/complaints`,
                method: 'GET',
                success: function(data) {
                    allComplaints = data;
                    filteredComplaints = data;
                    displayComplaints(data);
                    updateResultsCount(data.length);
                    $('#complaints-loading').hide();
                    $('#complaints-content').show();
                },
                error: function(xhr, status, error) {
                    $('#complaints-loading').hide();
                    showAlert('complaints-content', 'Error loading complaints: ' + error, 'error');
                }
            });
        }

        // Display complaints in table
        function displayComplaints(complaints) {
            const tbody = $('#complaints-tbody');
            tbody.empty();
            
            if (complaints.length === 0) {
                $('#complaints-table-container').hide();
                $('#no-results').show();
                return;
            }

            $('#complaints-table-container').show();
            $('#no-results').hide();
            
            complaints.forEach(complaint => {
                const user = allUsers.find(u => u.id === complaint.userId);
                const userName = user ? user.name : 'Unknown User';
                const userEmail = user ? user.email : '';
                const userPhone = user ? user.phone : '';
                
                const createdDate = new Date(complaint.createdAt).toLocaleDateString();
                const statusClass = `status-${complaint.status.replace(' ', '-')}`;
                
                const row = `
                    <tr>
                        <td>${complaint.id}</td>
                        <td>
                            <strong>${userName}</strong>
                            <div class="user-info">
                                <i class="fas fa-envelope"></i> ${userEmail}<br>
                                <i class="fas fa-phone"></i> ${userPhone}
                            </div>
                        </td>
                        <td><strong>${complaint.title}</strong></td>
                        <td>
                            <div class="complaint-description" title="${complaint.description}">
                                ${complaint.description}
                            </div>
                        </td>
                        <td>
                            <span class="status-badge ${statusClass}">
                                ${complaint.status}
                            </span>
                        </td>
                        <td>${createdDate}</td>
                        <td>
                            <button class="btn btn-warning" onclick="editComplaint(${complaint.id})">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="btn btn-danger" onclick="confirmDeleteComplaint(${complaint.id})">
                                <i class="fas fa-trash"></i> Delete
                            </button>
                        </td>
                    </tr>
                `;
                tbody.append(row);
            });
        }

        // Apply filters
        function applyFilters() {
            const userFilter = $('#filter-user').val();
            const titleFilter = $('#filter-title').val().toLowerCase();
            const statusFilter = $('#filter-status').val();
            
            filteredComplaints = allComplaints.filter(complaint => {
                const matchesUser = !userFilter || complaint.userId == userFilter;
                const matchesTitle = !titleFilter || complaint.title.toLowerCase().includes(titleFilter);
                const matchesStatus = !statusFilter || complaint.status === statusFilter;
                
                return matchesUser && matchesTitle && matchesStatus;
            });
            
            displayComplaints(filteredComplaints);
            updateResultsCount(filteredComplaints.length);
        }

        // Clear all filters
        function clearFilters() {
            $('#filter-user').val('');
            $('#filter-title').val('');
            $('#filter-status').val('');
            filteredComplaints = allComplaints;
            displayComplaints(filteredComplaints);
            updateResultsCount(filteredComplaints.length);
        }

        // Update results count
        function updateResultsCount(count) {
            const total = allComplaints.length;
            const countText = count === total ? 
                `Showing all ${total} complaints` : 
                `Showing ${count} of ${total} complaints`;
            $('#results-count').text(countText);
        }

        // Edit complaint
        function editComplaint(complaintId) {
            const complaint = allComplaints.find(c => c.id === complaintId);
            if (complaint) {
                $('#edit-complaint-id').val(complaint.id);
                $('#edit-complaint-user').val(complaint.userId);
                $('#edit-complaint-title').val(complaint.title);
                $('#edit-complaint-description').val(complaint.description);
                $('#edit-complaint-status').val(complaint.status);
                $('#edit-complaint-modal').show();
            }
        }

        // Update complaint
        function updateComplaint() {
            const complaintId = $('#edit-complaint-id').val();
            const formData = {
                userId: parseInt($('#edit-complaint-user').val()),
                title: $('#edit-complaint-title').val(),
                description: $('#edit-complaint-description').val(),
                status: $('#edit-complaint-status').val()
            };

            $.ajax({
                url: `${API_BASE_URL}/complaints/${complaintId}`,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(formData),
                success: function(data) {
                    showAlert('edit-complaint-alert', 'Complaint updated successfully!', 'success');
                    setTimeout(() => {
                        $('#edit-complaint-modal').hide();
                        loadComplaints();
                    }, 1500);
                },
                error: function(xhr, status, error) {
                    showAlert('edit-complaint-alert', 'Error updating complaint: ' + error, 'error');
                }
            });
        }

        // Confirm delete complaint
        function confirmDeleteComplaint(complaintId) {
            complaintToDelete = complaintId;
            $('#delete-complaint-modal').show();
        }

        // Delete complaint
        function deleteComplaint(complaintId) {
            $.ajax({
                url: `${API_BASE_URL}/complaints/${complaintId}`,
                method: 'DELETE',
                success: function(data) {
                    loadComplaints();
                    showAlert('complaints-content', 'Complaint deleted successfully!', 'success');
                },
                error: function(xhr, status, error) {
                    showAlert('complaints-content', 'Error deleting complaint: ' + error, 'error');
                }
            });
        }

        // Show alert message
        function showAlert(containerId, message, type) {
            const alertClass = type === 'success' ? 'alert-success' : 'alert-error';
            const alertHtml = `<div class="alert ${alertClass}">${message}</div>`;
            
            $(`#${containerId}`).html(alertHtml);
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                $(`#${containerId}`).empty();
            }, 5000);
        }