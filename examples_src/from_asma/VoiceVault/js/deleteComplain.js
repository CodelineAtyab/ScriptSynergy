// let selectedUserEmailId = "Anonymous";
document.getElementById("complaintList").addEventListener("change", (event) => {

    const SelectedValue = event.target.value;
    const selectedOption = event.target.options[event.target.selectedIndex];

    populateComplaintView(selectedOption.text, SelectedValue);

});

function deleteComplaint(){

    const complaintUuid = document.getElementById("complaintList").value;
    console.log(`Deleting complaint UUID: ${complaintUuid}`);

    // const myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    // const raw = JSON.stringify({
    //     "uuid": complaintUuid
    // });

    const requestOptions = {
    method: "DELETE",
    };

    fetch(`http://localhost:9999/complaints/${complaintUuid}`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("deleteComplaint").addEventListener("click", deleteComplaint);
});

