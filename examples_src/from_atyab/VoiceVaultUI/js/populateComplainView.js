const complainViewDivObj = document.getElementById("complainViewDiv");

function updateComplainView(title, complainId) {
  // Create needed child objects
  const newH1 = document.createElement("h1");
  newH1.innerHTML = "Complaint Information";

  const newH2 = document.createElement("h2");
  newH2.innerHTML = title;

  const newH3 = document.createElement("h3");
  newH3.innerHTML = complainId;

  const newPara = document.createElement("p");

  // Get complains from the API and populate the complain drop down
  fetch(`http://localhost:9999/complaints/${complainId}`)
    .then((response) => response.json())
    .then((jsonComplainObject) => {
      newPara.innerHTML = jsonComplainObject.content;
    })
    .catch((error) => console.error(error));

  // Before we append, we should clear the div
  complainViewDivObj.innerHTML = "";
  complainViewDivObj.appendChild(newH1);
  complainViewDivObj.appendChild(newH2);
  complainViewDivObj.appendChild(newH3);
  complainViewDivObj.appendChild(newPara);
}

document.getElementById("complaintList").addEventListener("change", (event) => {
  // Handle complaint selection change
  const selectedValue = event.target.value;
  const selectedOption = event.target.options[event.target.selectedIndex];

  updateComplainView(selectedOption.text, selectedValue);
});
