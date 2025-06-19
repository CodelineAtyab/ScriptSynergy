// Calling the function
// setTimeout(() => {console.log("I am f1 and I am done");}, 1000)
// const intervalObj = setInterval(() => {console.log("I am f2 and I will keep doing this after every second")}, 1000)

// console.log("Mid OF SCRIPT!!!");

// setTimeout(() => {clearInterval(intervalObj);}, 5000);
// Cross Origin Resource Sharing (CORS) 
// const ret = fetch("http://localhost:9999/users");
// const secRet = ret.then((response) => {
//   return response.json();
// });
// secRet.then((JSONresponse) => {
//   console.log(JSONresponse);
// })

// console.log(`I am already here!!! ${ret}`);
// console.log(`I am already here!!! ${secRet}`);

fetch("http://localhost:9999/users")
.then(response => response.json())
.then(JSONresponse => console.log(JSONresponse))
.then(whatever => console.log(whatever))
.then(whatever => console.log(whatever))
.catch((e) => {console.log(e);});

fetch("http://localhost:9999/complaints")
.then(response => response.json())
.then(JSONresponse => console.log(JSONresponse))
.catch((e) => {console.log(e);});

fetch("https://www.swapi.tech/api/people", {method: "GET"})
.then(response => response.json())
.then(JSONresponse => console.log(JSONresponse))
.catch((e) => {console.log(e);});

const announceLater = async (msg) => {
  return new Promise((resolve, rejected) => {
    if (true) {
      resolve(msg);
    } else {
      rejected("Something happened!");
    }
  });
};

announceLater("I am testing my async function").then((data) => {console.log(data);});

console.log(`Done Sending Both Requests`);