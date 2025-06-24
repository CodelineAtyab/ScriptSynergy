/*
function viewcomplaints(title, ComplainID) {

    const heading1 = document.createElement("h1");
    heading1.innerHTML = "Complaints View Information";


    const heading2 = document.createElement("h2");
    heading2.innerHTML = selectedOption.text;


    const compID = document.createElement("h3");
    compID.innerHTML = SelectedValue;


    const compcontent = document.createElement("p");

    fetch(`http://localhost:9999/complaints/${ComplainID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then((JSONresult) => {

            compcontent.innerHTML = JSONresult.content;
            console.log(JSONresult);



        })
        .catch(error => console.log('error', error));


}*/


const complViewDive = document.getElementById("CompaintViewDiv");
document.getElementById("complaintList").addEventListener("change", (event) => {

    console.log(event);
    const SelectedValue = event.target.value;
    const selectedOption = event.target.options[event.target.selectedIndex];
    console.log("Selected value:", {
        value: SelectedValue,
        text: selectedOption.text
    });

    const heading1 = document.createElement("h1");
    heading1.innerHTML = "Complaints View Information";

    const heading2 = document.createElement("h2");
    heading2.innerHTML = selectedOption.text;


    const compID = document.createElement("h3");
    compID.innerHTML = SelectedValue;
    const compcontent = document.createElement("p");


    complViewDive.innerHTML = "";
    complViewDive.appendChild(heading1);
    complViewDive.appendChild(heading2);
    complViewDive.appendChild(compID);
    complViewDive.appendChild(compcontent);

});