// Imagine this list of names is coming from an API
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

let searchText = "al kindi";  // "Ahmed Al-Balushi" -> "ahmed al-balushi" -> "ahmed al balushi"
const searchResults = userNames.filter((currentName) => {
  const currNameLowerWithoutSymbols = currentName.toLowerCase().replace("-", " ");
  const textToSearch = searchText.toLowerCase().replace("-", " ");
  // console.log("Name in lowercase: " + "'" + currNameLowerWithoutSymbols + "'" + " - " + "Search Text in lowercase: " + "'" + textToSearch + "'")  // Template Literal
  // console.log(`Name in lowercase '${currNameLowerWithoutSymbols}' Search Text in lowercase: '${textToSearch}'`);
  return currNameLowerWithoutSymbols.includes(textToSearch);
});

console.log(searchResults);
