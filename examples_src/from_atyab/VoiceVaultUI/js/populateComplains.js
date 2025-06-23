const complaintListObj = document.getElementById("complaintList");

// Get complains from the API and populate the complain drop down
fetch("http://localhost:9999/complaints")
  .then((response) => response.json())
  .then((jsonResponseList) => {
    jsonResponseList.forEach((currComplaintObj) => {
      console.log(currComplaintObj);

      const newOption = document.createElement("option");
      newOption.textContent = currComplaintObj.title;
      newOption.value = currComplaintObj.uuid;

      // complaintListObj.appendChild(new Option(currComplaintObj.title, currComplaintObj.uuid));
      complaintListObj.appendChild(newOption);
    });
  })
  .catch((error) => console.error(error));