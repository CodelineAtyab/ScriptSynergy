const x1 = console.log("Map, Reduce, Filter in JavaScript");
console.log(x1);

const names = ["Asma", "Qais", "Atyab"];


// The filter function that is provided by list object, needs your logic (function)
// But that logic should accept one parameter (element of the list)
// And should return true or false
const filteredList = names.filter((element) => {
  return element.startsWith("Q");
});

console.log(filteredList);

const processedList = names.map((elem) => {
  let processedElem = "";
  if (elem.startsWith("A") || elem.startsWith("a")) {
    processedElem = "[Team A] " + elem;
  } else if (elem.startsWith("Q") || elem.startsWith("q")) {
    processedElem = "[Team Q] " + elem;
  }
  return processedElem;
});

console.log(processedList);