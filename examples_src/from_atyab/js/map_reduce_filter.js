const numbers = [1, 2, 3, 4, 5];
numbers.push(6);
numbers.push(7);
numbers.push(8);

// 1. Lets build the logic
function squareNumberOld(num1) {
  let res = num1 * num1;
  return res;
}

const squareNumberNew = (num1) => {
  let res = num1 * num1;
  return res;
};

const resultList = numbers.map(squareNumberNew);
console.log(resultList);

// const resultStore = [];
// numbers.forEach((elem) => {
//   const res = elem * elem;
//   if (elem % 2 === 0) {
//     resultStore.push(res);
//   }
// });
// console.log(resultStore);


const names = ["Asma", "Qais", "Atyab"];


// The filter function that is provided by list object, needs your logic (function)
// But that logic should accept one parameter (element of the list)
// And should return true or false
const filteredList = names.filter((element) => {
  return element.startsWith("Q");
});

// console.log(filteredList);

const processedList = names.map((elem) => {
  let processedElem = "";
  if (elem.startsWith("A") || elem.startsWith("a")) {
    processedElem = "[Team A] " + elem;
  } else if (elem.startsWith("Q") || elem.startsWith("q")) {
    processedElem = "[Team Q] " + elem;
  }
  return processedElem;
});

// console.log(processedList);