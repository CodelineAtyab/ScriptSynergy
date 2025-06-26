const complainViewDivObj = document.getElementById("complainViewDiv");

function updateComplainView(title, complainId) {
  // Create needed child objects with Bootstrap classes
  const newH1 = document.createElement("h1");
  newH1.innerHTML = "Complaint Information";
  newH1.className = "text-primary mb-4";

  const titleDiv = document.createElement("div");
  titleDiv.className = "d-flex align-items-center mb-3";
  
  const newH2 = document.createElement("h2");
  newH2.innerHTML = title;
  newH2.className = "mb-0 text-dark";
  
  const badge = document.createElement("span");
  badge.innerHTML = complainId;
  badge.className = "badge bg-secondary ms-3 fs-6";
  
  titleDiv.appendChild(newH2);
  titleDiv.appendChild(badge);

  const contentCard = document.createElement("div");
  contentCard.className = "p-3 bg-light rounded";
  
  const newPara = document.createElement("p");
  newPara.className = "mb-0 lead";

  // Get complains from the API and populate the complain drop down
  fetch(`http://localhost:9999/complaints/${complainId}`)
  .then((response) => response.json())
  .then((jsonComplainObject) => {
    newPara.innerHTML = jsonComplainObject.content;
    
    // Add extra metadata if available
    if (jsonComplainObject.date) {
      const dateInfo = document.createElement("small");
      dateInfo.className = "d-block text-muted mt-3";
      dateInfo.innerHTML = `Submitted on: ${jsonComplainObject.date}`;
      contentCard.appendChild(dateInfo);
    }
  })
  .catch((error) => {
    console.error(error);
    newPara.innerHTML = "Error loading complaint details.";
    newPara.className = "text-danger";
  });

  contentCard.appendChild(newPara);

  // Before we append, we should clear the div
  complainViewDivObj.innerHTML = "";
  complainViewDivObj.appendChild(newH1);
  complainViewDivObj.appendChild(titleDiv);
  complainViewDivObj.appendChild(contentCard);
}

document.getElementById("complaintList").addEventListener("change", (event) => {
  // Handle complaint selection change
  const selectedValue = event.target.value;
  const selectedOption = event.target.options[event.target.selectedIndex];

  updateComplainView(selectedOption.text, selectedValue);
});

// Initialize with a loading message
complainViewDivObj.innerHTML = `
  <div class="text-center p-5">
    <h3 class="text-muted">Select a user and complaint to view details</h3>
    <div class="spinner-border text-primary mt-3" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
`;
