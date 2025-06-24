const complList = document.getElementById('complaintList');
// Get complains from the API and populate the complain drop down
fetch("http://localhost:9999/complaints")
    .then((response) => response.json())
    .then((jsonRespoList) => {
        jsonRespoList.forEach((currComplaintObj) => {
            console.log(currComplaintObj);
            const newOption = document.createElement("option");
            newOption.textContent = currComplaintObj.title;
            newOption.value = currComplaintObj.uuid;
            newOption.originalObj = currComplaintObj;

            // complaintListObj.appendChild(new Option(currComplaintObj.title, currComplaintObj.uuid));
            complList.appendChild(newOption);
        });
    })
    .catch((error) => console.error(error));
