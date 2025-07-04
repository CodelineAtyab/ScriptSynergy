const complViewDive = document.getElementById("CompaintViewDiv");

function populateComplaintView(title, ComplainID, complainContent) {
    // Create Bootstrap card
    const card = document.createElement("div");
    card.className = "card shadow-sm";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const heading1 = document.createElement("h5");
    heading1.className = "card-title text-primary fw-bold mb-3";
    heading1.innerHTML = "Complaint Information";

    const heading2 = document.createElement("h6");
    heading2.className = "card-subtitle mb-2 text-dark";
    heading2.innerHTML = title;

    const compID = document.createElement("div");
    compID.className = "mb-2 text-muted small";
    compID.innerHTML = `<strong>ID:</strong> ${ComplainID}`;

    const compcontent = document.createElement("p");
    compcontent.className = "card-text";

    fetch(`http://localhost:9999/complaints/${ComplainID}`)
        .then((response) => response.json())
        .then((jsonComplainObject) => {
            compcontent.innerHTML = `<strong>Comment:</strong> ${jsonComplainObject.content}`;
        })
        .catch((error) => console.error(error));

    // Clear and append
    complViewDive.innerHTML = "";
    cardBody.appendChild(heading1);
    cardBody.appendChild(heading2);
    cardBody.appendChild(compID);
    cardBody.appendChild(compcontent);
    card.appendChild(cardBody);
    complViewDive.appendChild(card);
};

document.getElementById("complaintList").addEventListener("change", (event) => {

    const SelectedValue = event.target.value;
    const selectedOption = event.target.options[event.target.selectedIndex];

    populateComplaintView(selectedOption.text, SelectedValue);

});

    // fetch(`http://localhost:9999/complaints/${SelectedValue}`)
    //     .then((response) => response.json())
    //     .then((jsonComplainObject) => {
    //         compcontent.innerHTML = jsonComplainObject.content;
    //     })
    //     .catch((error) => console.error(error));

    // complViewDive.innerHTML = "";
    // complViewDive.appendChild(heading1);
    // complViewDive.appendChild(heading2);
    // complViewDive.appendChild(compID);
    // complViewDive.appendChild(compcontent);




