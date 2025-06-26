// task 3:
function printEvenNumber(numbE) {
  return numbE % 2 === 0;
}
function printOddNumber(numbO) {
  return numbO % 2 !== 0;
}

let qaisarry = [1, 2, 3, 4, 5, 6, 8, 56];
let showEven = true; 
if (showEven) {
 let aa = qaisarry.filter(printEvenNumber);
 console.log("Even numbers:", aa);

} else {
  let bb = qaisarry.filter(printOddNumber);
  console.log("Odd numbers:", bb);
}
//  const numbers = [2, 5, 6, 8, 10, 12, 13];

//     function showEvenAndOdd(arr) {
//       console.log("Even Numbers");

//       arr.forEach(function(num1) {
//         if (num1 % 2 === 0) {
//           console.log(num1);
//         }
//       });

//       console.log("Odd Numbers");
//       arr.forEach(function(num2) {
//         if (num2 % 2 !== 0) {
//           console.log(num2);
//         }
//       });
//     }

//     showEvenAndOdd(numbers);

// task 1:
function showNameInTurns() {
let fullName = "QAIS ALAMRANI"; 
let nameParts = fullName.split(" "); 
let display = document.getElementById("nameDisplay"); 
  for (let i = 0; i < nameParts.length; i++) {
      setTimeout(function() 
      { display.textContent = nameParts[i];  }, i * 1000); 
  }
}
window.onload = showNameInTurns;

   // task 2: 
function newFunction(name1, name2) {
  name1 = "qais";
  name2 = "alamrani";
  const fullName = name1 + " " + name2;
  console.log(fullName);
}

newFunction();
        