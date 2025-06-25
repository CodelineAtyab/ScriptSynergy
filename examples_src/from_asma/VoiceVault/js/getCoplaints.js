const complList = document.getElementById('complaintList');

// Get complains from the API and populate the complain drop down
fetch("http://localhost:9999/complaints")
    .then((response) => response.json())
    .then((jsonRespoList) => {
        jsonRespoList.forEach((currComplaintObj) => {
            // console.log(currComplaintObj);
            const newOption = document.createElement("option");
            newOption.textContent = currComplaintObj.title;
            newOption.value = currComplaintObj.uuid;
            newOption.originalObj = currComplaintObj;

            // complaintListObj.appendChild(new Option(currComplaintObj.title, currComplaintObj.uuid));
            complList.appendChild(newOption);
        });
        /**
* {
       "uuid": "6a5b4c3d-2e1f-0g9h-8i7j-6k5l4m3n2o1p",
       "title": "Outdated CSS Materials",
       "time_in_epoch": 1675382400000,
       "content": "Training materials on responsive design are outdated and don't cover modern CSS Grid techniques.",
       "by_user": "fatima.farsi@example.com"
   },
*/

        // console.log(complList[0].value);

    })
    .catch((error) => console.error(error));

