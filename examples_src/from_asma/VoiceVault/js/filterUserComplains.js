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
    console.log(filteredcomplains);
    // const filteredcomplains = populateComplaintView(SelectedValue);

    hideComplainsOps();


    showSpecificComplainOptions(filteredcomplains);

    if (filteredcomplains.length > 0 && filteredcomplains[0] instanceof HTMLOptionElement) {
        // filteredcomplains[0].selected = true;
        populateComplaintView(filteredcomplains[0].originalObj.title, filteredcomplains[0].originalObj.uuid);
        filteredcomplains[0].selected = true;

    }



});
