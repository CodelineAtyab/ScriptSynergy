const userListObj = document.getElementById("userList");

// Get user info from the API and populate the user drop down
fetch("http://localhost:9999/users")
  .then((response) => response.json())
  .then((jsonResponseList) => {
    jsonResponseList.forEach((currUserObj) => {
      const newOption = document.createElement("option");
      newOption.textContent = currUserObj.username;
      newOption.value = currUserObj.email;

      userListObj.appendChild(newOption);
    });
  })
  .catch((error) => console.error(error));
