const userNames = [
  "Ahmed Al-Balushi",
  "Fatma Al-Kindi",
  "Mohammed Al-Abri",
  "Aisha Al-Maskari",
  "Salim Al-Habsi",
  "Maryam Al-Kindi",
  "Abdullah Al-Riyami",
  "Laila Al-Saadi",
  "Khalid Al-Mawali",
  "Zainab Al-Busaidi",
  "Said Al-Rawahi",
  "Salma Al-Mahrouqi",
  "Sultan Al-Ismaily",
  "Noora Al-Azri",
  "Qais Al-Ghafri"
];

const putAllUsers = (availableUserNames) => {
  // Grab existing <ul id="ulOfNames"> <li>Mr. A</li> </ul>
  const ulNamesObj = document.getElementById("ulOfNames");
  // Clear all existing list items before adding new ones
  ulNamesObj.innerHTML = "";

  // This is used to display all users
  availableUserNames.forEach((currentName) => {
    const newListItem = document.createElement("li");  // This creates a new <li></li>
    newListItem.innerHTML = currentName; // This tell the object to have a value <li>Ahmed Al-Balushi</li>

    // Tell ul object to put this <li>Ahmed Al-Balushi</li> as a child 
    // so this becomes <ul id="ulOfNames"> <li>Ahmed Al-Balushi</li> </ul>
    ulNamesObj.appendChild(newListItem);
  });

};

// Initially Display All Users
putAllUsers(userNames);


// THis is used to filter users by names
const searchUserNameInputObj = document.getElementById("searchUserNameInput");
searchUserNameInputObj.addEventListener("input", (event) => {
  console.log(event.target.value)
  if(event.target.value === "") {
    putAllUsers(userNames);
  } else {
    const filteredUsers = userNames.filter((currentName) => {
      const currNameLowerWithoutSymbols = currentName.toLowerCase().replace("-", " ");
      const textToSearch = event.target.value.toLowerCase().replace("-", " ");
      return currNameLowerWithoutSymbols.includes(textToSearch);
    });
    putAllUsers(filteredUsers);
  }
});