// Selector
$("#extraH1").fadeOut(3000);


// function $(inpText) {
//   inpText.startsWith("#")
//     this.element = document.getElementById(inpText.substring(1))

//     return Object 
// }

/**
 * var settings = {
    "url": "http://localhost:9999/complaints/7f9e7b5c-9d1a-4b8c-8d3e-6f5e4d3c2b1a",
    "method": "PUT",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json"
    },
    "data": JSON.stringify({
      "content": "This is updated now!",
      "title": "New Title"
    }),
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
  });
 */

// fetch("http://localhost:9999/users")
//   .then((response) => response.json())
//   .then((jsonResponse) => {console.log(jsonResponse);})
//   .catch((error) => {console.log(error);})

$.ajax({
  url: "http://localhost:9999/users",
  type: "POST",
  contentType: 'application/json',
  data: JSON.stringify({
    username: "Mr.NewNew",
    email: "mrnewnew@gmail.com"
  }),
  success: (response) => {
    console.log(response);

    $.ajax({
      url: "http://localhost:9999/users",
      type: "GET",
      success: (response) => {
        console.log(response);
      },
      error: (xhr, status, error) => {console.log(error);}
    });

  },
  error: (xhr, status, error) => {console.log(error);}
});

