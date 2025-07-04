let selectedUserEmailId = "Anonymous";
document.getElementById("userList").addEventListener("change", (event) => {
    // console.log(event);
    selectedUserEmailId = event.target.value;
    const selectedOption = event.target.options[event.target.selectedIndex];
    // console.log(selectedUserEmailId);
});
function submitComplaint() {
    // const selectedUserEmailId = SelectedValue; 
    // const complainuser = document.getElementById('userList');

    const complainTitle = document.getElementById('complainTitle').value;

    const complainComment = document.getElementById('complainComment').value;
    console.log(`${selectedUserEmailId}--${complainTitle}--${complainComment}`);
    //send post request to API to submit the complain 
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "title": complainTitle,
        "content": complainComment,
        "by_user": selectedUserEmailId
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };

    fetch("http://localhost:9999/complaints", requestOptions)
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
} 