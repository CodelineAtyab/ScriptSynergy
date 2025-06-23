// Imagine this list of names is coming from an API
// const userNames = [
//   "Ahmed Al-Balushi",
//   "Fatma Al-Kindi",
//   "Mohammed Al-Abri",
//   "Aisha Al-Maskari",
//   "Salim Al-Habsi",
//   "Maryam Al-Kindi",
//   "Abdullah Al-Riyami",
//   "Laila Al-Saadi",
//   "Khalid Al-Mawali",
//   "Zainab Al-Busaidi",
//   "Said Al-Rawahi",
//   "Salma Al-Mahrouqi",
//   "Sultan Al-Ismaily",
//   "Noora Al-Azri",
//   "Qais Al-Ghafri"
// ];

/**
 * fetch("http://localhost:9999/users", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    console.log(result);
    result.forEach((elem) => {
      console.log(elem.username);
      console.log(elem.email);
    });
  })
  .catch((error) => console.error(error));
 */

/**
 * [
      {
          "email": "ahmed.balushi@example.com",
          "username": "Ahmed Al-Balushi"
      },
      {
          "email": "fatima.farsi@example.com",
          "username": "Fatima Al-Farsi"
      },
      {
          "email": "mohammed.riyami@example.com",
          "username": "Mohammed Al-Riyami"
      },
      {
          "email": "aisha.kharusi@example.com",
          "username": "Aisha Al-Kharusi"
      },
      {
          "email": "yusuf.siyabi@example.com",
          "username": "Yusuf Al-Siyabi"
      }
   ]
 */
const filterUserNames = async () => {
  const response = await fetch("http://localhost:9999/users");
  const listOfUserInfoObjects = await response.json();
  const userNames = listOfUserInfoObjects.map((currUserInfoObj) => {
    return currUserInfoObj.username;
  });

  // Transform the list
  const allNamesList = userNames.map((currentName) => {
    const newListItemObj = document.createElement("li");
    newListItemObj.innerHTML = currentName;
    return newListItemObj;
  });

  console.log(allNamesList);

  allNamesList.forEach((currentLiWithName) => {
    const candidatesNamesUlObj = document.getElementById("candidatesNames");

    // Make newListItemObj the child of candidatesNamesUlObj
    candidatesNamesUlObj.appendChild(currentLiWithName);
  });

  const nameInputObj = document.getElementById("nameSearchField");

  // On Every Input Call My Function
  nameInputObj.addEventListener("input", (event) => {
    // Every Object Should Be Visible in the Start
    allNamesList.forEach((currFilteredNameListObj) => {
      currFilteredNameListObj.hidden = false;
    });

    console.log(event.target.value);
    const textToSearch = event.target.value
      .toLowerCase()
      .replaceAll("-", "")
      .replaceAll(" ", "");
    let filteredNamesToHide = null;

    if (textToSearch !== "") {
      filteredNamesToHide = allNamesList.filter((element) => {
        return !element.innerHTML
          .toLowerCase()
          .replaceAll("-", "")
          .replaceAll(" ", "")
          .includes(textToSearch);
      });
    }
    if (filteredNamesToHide != null) {
      filteredNamesToHide.forEach((currFilteredNameListObj) => {
        currFilteredNameListObj.hidden = true;
      });
    }
    console.log(filteredNamesToHide);
  });
};

filterUserNames();
