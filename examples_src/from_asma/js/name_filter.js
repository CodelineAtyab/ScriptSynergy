// setTimeout((currentName)=> {
//     const changeeading = document.getElementById("nameText");
//     changeeading.innerHTML=currentName;

// },1000)

// console.log();

// setTimeout((currentName)=> {
//     const changeeading = document.getElementById("nameText");
//     changeeading.innerHTML=currentName;

// },1000)

// console.log();

const names = [
  "Ahmed Al-Jabri",
  "Fatima Al-Harthy",
  "Omar Al-Maskari",
  "Laila Al-Busaidi",
  "Khalid Al-Hinai",
  "Nora Al-Farsi",
  "Tariq Al-Araimi",
  "Zainab Al-Shukaili",
  "Yousef Al-Maawali",
  "Amina Al-Balushi",
  "Saeed Al-Mandhari",
  "Huda Al-Rawahi",
  "Rashid Al-Kalbani",
  "Salma Al-Amri",
  "Faisal Al-Nabhani",
  "Mona Al-Saadi",
  "Abdullah Al-Mugheiry",
  "Dana Al-Abri",
  "Hassan Al-Zadjali",
  "Rania Al-Ajmi",
  "John Smith",
  "Jane Doe",
  "Robert Johnson",
  "Emily Williams",
  "Michael Brown",
  "Sarah Davis",
  "David Miller",
  "Jessica Wilson"
];

// Declare userNames in the global scope
// let userNames = [];

//this creates a list of names that contain "al" in them
// regardless of case
// and appends them to the unordered list with id "ulOfNames" 
// const filteredNames = names.filter(function(name) {
//   return name.toLowerCase().includes("al");
// });
// var requestOptions = {
//   method: 'GET',
//   redirect: 'follow'
// };
// This fetch request is to get the names from the API
// fetch("http://192.168.100.51:9999/users", requestOptions)
//   .then(response => response.json())
//   .then(result => {

//     console.log(result)
//     result.forEach((getnames) => {
//         console.log(getnames.username);

//     });
//   })
//   .catch(error => console.log('error', error));

// Display each name one 
const putAllUser = async (availabeNames) => {
    const ulOfNamesOj = document.getElementById("ulOfNames");
    ulOfNamesOj.innerHTML = ""; // Clear the list before adding new items
    availabeNames.forEach(function (name) {

      const newListItem = document.createElement("li");
      newListItem.innerHTML = name;

      ulOfNamesOj.appendChild(newListItem);
    });
};

async function fetchUsersFromAPI() {
  const response = await fetch("http://localhost:9999/users");
  const JSONRespons = await response.json();
  userNames = JSONRespons.map((userInfoOBj) => {
    return userInfoOBj.username;
  });
  putAllUser(userNames);
}

//call function 
fetchUsersFromAPI();

// Get the search input element by its ID
  const searchUsersNameOJ = document.getElementById("searchUsersNameInput");

  // Add an event listener to handle input changes in the search box
  searchUsersNameOJ.addEventListener("input", (event) => {
    // If the search box is empty, show all names
    if (event.target.value === "") {
      putAllUser(userNames);
    } else {
      // Otherwise, filter the names array based on the search input
      const filterusers = userNames.filter((name) => {
        // Convert both the name and search input to lowercase and replace "-" with " " for better matching
        const namelowerwithoutSamples = name.toLowerCase().replace("-", " ");
        const testToSearch = event.target.value.toLowerCase().replace("-", " ");
        // Check if the name includes the search input
        return namelowerwithoutSamples.includes(testToSearch);
      });
      // Display the filtered names in the list
      putAllUser(filterusers);
    }
  });







