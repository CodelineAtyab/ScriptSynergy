const complViewDive = document.getElementById("CompaintViewDiv");

function populateComplaintView(title, ComplainID, complainContent) {
    const heading1 = document.createElement("h1");
    heading1.innerHTML = "Complaints View Information";

    const heading2 = document.createElement("h2");
    heading2.innerHTML = title;


    const compID = document.createElement("h3");
    compID.innerHTML = ComplainID;
    const compcontent = document.createElement("p");

    fetch(`http://localhost:9999/complaints/${ComplainID}`)
        .then((response) => response.json())
        .then((jsonComplainObject) => {
            compcontent.innerHTML = jsonComplainObject.content;
        })
        .catch((error) => console.error(error));

    complViewDive.innerHTML = "";
    complViewDive.appendChild(heading1);
    complViewDive.appendChild(heading2);
    complViewDive.appendChild(compID);
    complViewDive.appendChild(compcontent);
};

document.getElementById("complaintList").addEventListener("change", (event) => {

    //console.log(event);
    const SelectedValue = event.target.value;
    const selectedOption = event.target.options[event.target.selectedIndex];

    populateComplaintView(selectedOption.text, SelectedValue);
    // console.log("Selected value:", {
    //     value: SelectedValue,
    //     text: selectedOption.text
    // });

    // const heading1 = document.createElement("h1");
    // heading1.innerHTML = "Complaints View Information";

    // const heading2 = document.createElement("h2");
    // heading2.innerHTML = selectedOption.text;


    // const compID = document.createElement("h3");
    // compID.innerHTML = SelectedValue;
    // const compcontent = document.createElement("p");

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

});


