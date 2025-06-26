// Spread Operation
const tropicalFruits = ["Orange", "Pineapple", "Passion Fruit"];
const dryFruits = ["Almond", "Cashew", "Date"];

const allFruits = [...tropicalFruits, ...dryFruits];

const acRemote = {
  color: "white", 
  brandName: "panasonic", 
  noOfButtons: 10, 
  buttons: [()=>{}, ()=>{}, ()=>{}], 
  powerOn: ()=>{}, 
  powerOff: ()=>{}
};

// const purchasedColor = acRemote.color;
// const purchasedBrand = acRemote.brandName;

const {color, noOfButtons, powerOff} = acRemote;

console.log(color);
console.log(noOfButtons);
powerOff();
// const f1 = tropicalFruits[0];
// const f2 = tropicalFruits[1];

// Array/List Destructuring
const [f1, f2, f3, f4, f5, f6] = [...tropicalFruits, ...dryFruits];

// console.log(f1);
// console.log(f2);
// console.log(f3);
// console.log(f4);
// console.log(f5);
// console.log(f6);


// cons0ole.log(allFruits);

function sum(...restOfNumbers) {
  let res = 0;
  restOfNumbers.forEach((num) => {
    res = res + num;  // 0 + 1=1   1 + 2=3   3 + 3=6  6+4=10  10+5=15
  });
  return res;
}

const result = sum(1, 2, 3, 4, 5, 100);
// console.log(result);