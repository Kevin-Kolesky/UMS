var express = require("express");
var mysql = require("mysql");
var app = express();
app.use(express.json);

const con=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'umsdb'
})

con.connect((err) => {
    if (err) {
        console.log(err);
    }else{
        console.log("connected!!")
    }
})



let arrUsers = JSON.parse(localStorage.getItem('users')) || [];
let INDEX;

//Edit Modal Submit Button
document.getElementById('btnUpdate').addEventListener('click', function() {
    updateUser(document.getElementById('editName').value , document.getElementById('editEmail').value, document.getElementById('editPass').value, INDEX);
});

document.getElementById('btnDelete').addEventListener('click', function() {
    deleteUser(INDEX);
});

function updateUser (username, email, password, index){
    let updatedUser = {
            name: username,
            email: email,
            password: password
        };

        arrUsers[index] = updatedUser;
        localStorage.setItem('users', JSON.stringify(arrUsers));
        displayusers();
};

function deleteUser (index) {
    arrUsers.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(arrUsers));
    displayusers(); // Update display after deletion
};

function addEventListeners() {
    //Edit Buttons
    document.querySelectorAll('.edit-button').forEach((button, index) => {
        button.addEventListener('click', function() {
            let username = arrUsers[index].name;
            let email = arrUsers[index].email; 
            let password = arrUsers[index].password;

            document.getElementById('editName').value =  username; 
            document.getElementById('editEmail').value = email; 
            document.getElementById('editPass').value =  password;
            INDEX = index;
        });
    });

    //Delete buttons
    document.querySelectorAll('.delete-button').forEach((button, index) => {
        button.addEventListener('click', function() {
            INDEX = index;
        });
    });
}

function displayusers() {
    const table = document.getElementById('tableBody');
    table.innerHTML = '';
    arrUsers.forEach((user, index) => {
        let HTMLString = `         
        <tr class="table-dark border border-primary" id="user${index}>
        <th scope="row"></th>
        <td>${index + 1}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td>                
            <button type="button" class=" edit-button btn btn-primary" id="edit${index}" 
            data-bs-toggle="modal" data-bs-target="#editModal">
            <?xml version="1.0" ?>
            <svg class"feather feather-edit" fill="none" height="20" stroke="currentColor" stroke-linecap="round" 
            stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
        </td>    
        <td>
            <button type="button"  class="delete-button danger-button btn-danger btn" aria-label="Close" id="edit${index}"
            data-bs-toggle="modal" data-bs-target="#deleteModal">
            <?xml version="1.0" ?>
            <svg class="feather feather-trash" fill="none" height="20" stroke="currentColor" 
            stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><polyline points="3 6 5 6 21 6"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
            </td>
      </tr>`
        table.insertAdjacentHTML('beforeend', HTMLString);
    });
    addEventListeners();
}

//Display users when the page loads
window.addEventListener('load', displayusers);
