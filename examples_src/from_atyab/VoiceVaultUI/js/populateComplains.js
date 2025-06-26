const complaintListObj = document.getElementById("complaintList");

// Get complains from the API and populate the complain drop down
fetch("http://localhost:9999/complaints")
  .then((response) => response.json())
  .then((jsonResponseList) => {
    jsonResponseList.forEach((currComplaintObj) => {
      const newOption = document.createElement("option");
      newOption.textContent = currComplaintObj.title;
      newOption.value = currComplaintObj.uuid;
      newOption.originalObj = currComplaintObj;

      // complaintListObj.appendChild(new Option(currComplaintObj.title, currComplaintObj.uuid));
      complaintListObj.appendChild(newOption);
    });
  })
  .catch((error) => console.error(error));


function filterComplainsOptionsByUserId(givenUserId) {
  const filteredComplains = Array.from(complaintListObj).filter((optionObj) => {
    if (optionObj.originalObj.by_user == givenUserId) {
      return true;
    }
  });
  return filteredComplains;
}

function hideAllComplaintOptions() {
  Array.from(complaintListObj).forEach((currCompOption) => {
    currCompOption.hidden = true;
  });
}

function showSpecificComplainOptions(optionsToShow) {
  Array.from(optionsToShow).forEach((currCompOption) => {
    currCompOption.hidden = false;
  });
}