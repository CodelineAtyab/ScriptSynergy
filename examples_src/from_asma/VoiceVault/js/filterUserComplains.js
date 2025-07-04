//onst complViewDive = document.getElementById("CompaintViewDiv");
document.getElementById("userList").addEventListener("change", (event) => {
    // console.log(event);
    const SelectedValue = event.target.value;
    const selectedOption = event.target.options[event.target.selectedIndex];
    console.log(SelectedValue);

    const filteredcomplains = Array.from(complList).filter((OptionObj) => {
        //console.log(OptionObj.originalObj.by_user, SelectedValue);

        if (OptionObj.originalObj && OptionObj.originalObj.by_user == SelectedValue) {
            return true;
        }
    });
    // console.log(filteredcomplains);

    Array.from(complList).forEach((currComplainOp) => {
        currComplainOp.hidden = true;
    });// Clear the existing options

    Array.from(filteredcomplains).forEach((currComplainOp) => {
        currComplainOp.hidden = false;

    });
    if (filteredcomplains[0].hasAttribute("selected")) {
        filteredcomplains[0].selected = true;
        populateComplaintView(filteredcomplains[0].originalObj.title, filteredcomplains[0].originalObj.uuid);
    }
    


    // console.log("Selected value:", {
    //     value: SelectedValue,
    //     text: selectedOption.text 


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
    //     .catch((error) => console.error(error)); // <-- moved inside the event listener

    // complViewDive.innerHTML = "";
    // complViewDive.appendChild(heading1);
    // complViewDive.appendChild(heading2);
    // complViewDive.appendChild(compID);
    // complViewDive.appendChild(compcontent);
});
