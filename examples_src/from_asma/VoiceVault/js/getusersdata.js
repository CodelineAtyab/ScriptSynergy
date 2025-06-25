const userList = document.getElementById('userList');

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

fetch("http://localhost:9999/users", requestOptions)
    .then(response => response.json())
    .then((JSONList) => {
        // console.log(JSONList);
        //convert the list of the json to list of strings the user name
        JSONList.forEach((CurrUserObj) => {
            // console.log(CurrUserObj);
            const newOption = document.createElement('option');
            newOption.textContent = CurrUserObj.username;
            newOption.value = CurrUserObj.email;
            userList.appendChild(newOption);

        })
    })
    .catch(error => console.log('error', error));