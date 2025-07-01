  const ListOfUsers = ["QAIS", "MIAAD", "MOHAMMED", "QABASS", "SARA", "AHMED"];
        
        const UserComplaints = {
            "QAIS": [
                {id: 1, title: "Login Issue", description: "Cannot login to my account since yesterday", status: "Open"},
                {id: 2, title: "Payment Problem", description: "My payment was charged twice", status: "In Progress"},
                {id: 3, title: "Slow Loading", description: "Website takes too long to load", status: "Resolved"}
            ],
            "MIAAD": [
                {id: 4, title: "Profile Update", description: "Unable to update my profile picture", status: "Open"},
                {id: 5, title: "Email Notification", description: "Not receiving email notifications", status: "Open"}
            ],
            "MOHAMMED": [
                {id: 6, title: "Password Reset", description: "Password reset link not working", status: "In Progress"},
                {id: 7, title: "Account Suspension", description: "My account was suspended without reason", status: "Open"},
                {id: 8, title: "Data Export", description: "Need to export my data", status: "Resolved"}
            ],
            "QABASS": [
                {id: 9, title: "Mobile App Bug", description: "App crashes when opening messages", status: "Open"}
            ],
            "SARA": [
                {id: 10, title: "Billing Issue", description: "Wrong amount charged on my card", status: "In Progress"},
                {id: 11, title: "Feature Request", description: "Need dark mode option", status: "Open"}
            ],
            "AHMED": [
                {id: 12, title: "Security Concern", description: "Suspicious activity on my account", status: "Resolved"}
            ]
        };
        

        let currentSelectedUser = "";
        let currentSelectedComplaint = null;
        const createUsersList = () => {
            const usersList = document.getElementById("usersList");
            usersList.innerHTML = ""; // Clear previous content
            
            // Heere i Create user items using map 
            const userItems = ListOfUsers.map((userName) => {
                let userElement = document.createElement("div");
                userElement.className = "user-item";
                userElement.textContent = userName;
                
                userElement.addEventListener("click", () => {
                    selectUser(userName);
                });
                
                return userElement;
            });
            
            userItems.forEach((item) => {
                usersList.appendChild(item);
            });
        };
      
        const selectUser = (userName) => {
            currentSelectedUser = userName;
            
            updateUserSelection();
            
            showUserComplaints(userName);
        };
        
        const updateUserSelection = () => {
            const allUsers = document.querySelectorAll(".user-item");
            
            allUsers.forEach((userItem) => {
            
                userItem.classList.remove("selected");
                
                if (userItem.textContent === currentSelectedUser) {
                    userItem.classList.add("selected");
                }
            });
        };
        
        const showUserComplaints = (userName) => {
            const complaintsList = document.getElementById("complaintsList");
            complaintsList.innerHTML = ""; 
            
            const userComplaintsData = UserComplaints[userName] || [];
            
            if (userComplaintsData.length === 0) {
                complaintsList.innerHTML = "<p>No complaints found for this user.</p>";
                document.getElementById("complaintDetails").innerHTML = "No complaints to display.";
                return;
            }
            
            const complaintItems = userComplaintsData.map((complaint) => {
                let complaintElement = document.createElement("div");
                complaintElement.className = "complaint-item";
                complaintElement.textContent = `${complaint.title} - [${complaint.status}]`;
                
                complaintElement.addEventListener("click", () => {
                    selectComplaint(complaint);
                });
                
                return complaintElement;
            });
            
            complaintItems.forEach((item) => {
                complaintsList.appendChild(item);
            });
            
            if (userComplaintsData.length > 0) {
                selectComplaint(userComplaintsData[0]);
            }
        };
        
        const selectComplaint = (complaint) => {
            currentSelectedComplaint = complaint;
            updateComplaintSelection();
            showComplaintDetails(complaint);
        };
        
        const updateComplaintSelection = () => {
            const allComplaints = document.querySelectorAll(".complaint-item");
            allComplaints.forEach((complaintItem) => {
                complaintItem.classList.remove("selected");
                if (currentSelectedComplaint && 
                    complaintItem.textContent.includes(currentSelectedComplaint.title)) {
                    complaintItem.classList.add("selected");
                }
            });
        };
      
        const showComplaintDetails = (complaint) => {
            const detailsArea = document.getElementById("complaintDetails");
     
            let detailsContent = `
                <strong>Complaint ID:</strong> ${complaint.id}<br><br>
                <strong>Title:</strong> ${complaint.title}<br><br>
                <strong>Description:</strong> ${complaint.description}<br><br>
                <strong>Status:</strong> <span style="color: ${getStatusColor(complaint.status)}; font-weight: bold;">${complaint.status}</span><br><br>
                <strong>User:</strong> ${currentSelectedUser}
            `;
            
            detailsArea.innerHTML = detailsContent;
        };
        
        const getStatusColor = (status) => {
            if (status === "Open") return "#dc3545";
            if (status === "In Progress") return "#fd7e14";
            if (status === "Resolved") return "#28a745";
            return "#6c757d";
        };
        const initializeApp = () => {
            
            createUsersList();
            
           
            if (ListOfUsers.length > 0) {
                selectUser(ListOfUsers[0]);
            }
        };

        document.addEventListener("DOMContentLoaded", initializeApp);
        console.log("Users List:", ListOfUsers);
        console.log("All Complaints Data:", UserComplaints);