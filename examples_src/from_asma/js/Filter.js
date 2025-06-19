console.log("Filter method example ");

const names=["Asma","Ali","Ahmed","Ayesha","Sara","Sana"];

const newFillteredList = names.filter((names) => {
   return names.startsWith("A");
});

console.log(newFillteredList);

// function filterNames(n) {
//     const res = n.include ("s");
//     return res;
    
// };

// const name = "Asma";
// filterNames(name);
// console.log(filterNames);