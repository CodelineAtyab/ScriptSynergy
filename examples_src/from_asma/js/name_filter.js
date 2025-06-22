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

//this creates a list of names that contain "al" in them
// regardless of case
// and appends them to the unordered list with id "ulOfNames" 
// const filteredNames = names.filter(function(name) {
//   return name.toLowerCase().includes("al");
// });


// Display each name one after another with a 1 second delay 
const putAllUser =(availabeNames) =>{

  const ulOfNamesOj = document.getElementById("ulOfNames");
    ulOfNamesOj.innerHTML = ""; // Clear the list before adding new items
  availabeNames.forEach(function(name) {
  
    const newListItem = document.createElement("li");
    newListItem.innerHTML = name;

    ulOfNamesOj.appendChild(newListItem);
 }); 

};

putAllUser(names);
// // Uncomment the following code to display names with a 1 second delay
// filteredNames.forEach(function(name, index) {
//   setTimeout(function() {
//     const newListItem = document.createElement("li");
//     newListItem.textContent = name;
//     ulOfNamesOj.appendChild(newListItem);
//   }, index * 1000);
// }); 

// all usernames are in the form of "firstName lastName"
// this will filter the names based on the input in the search box    

// Get the search input element by its ID
const searchUsersNameOJ = document.getElementById("searchUsersNameInput");

// Add an event listener to handle input changes in the search box
searchUsersNameOJ.addEventListener("input", (event) => {
  // If the search box is empty, show all names
  if (event.target.value === "") {
    putAllUser(names);
  } else {
    // Otherwise, filter the names array based on the search input
    const filterusers = names.filter((name) => {
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



