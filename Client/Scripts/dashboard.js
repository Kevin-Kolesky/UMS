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
            username: username,
            password: password,
            email: email
        };
        fetch(`http://localhost:5000/api/update/${index}`, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser),
        })
        .then(response =>{
            // Check if the response is successful
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) });
            }
            // Check if the response is JSON
            if (response.headers.get('content-type')?.includes('application/json')) {
                return response.json();
            } else {
                return response.text(); // Handle plain text response
            }
        })
        .then(data => {
            displayusers();
        }) 
        .catch(error => console.error('Error updating user:', error));
};

function deleteUser (index) {
    fetch(`http://localhost:5000/api/delete/${index}`, {
        method: 'DELETE'
    })
    .then(response =>{
        // Check if the response is successful
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text) });
        }
        // Check if the response is JSON
        if (response.headers.get('content-type')?.includes('application/json')) {
            return response.json();
        } else {
            return response.text(); // Handle plain text response
        }
    })
    .then(data => {
        console.log('User deleted:', data);
        displayusers();
    })
    .catch(error => console.error('Error deleting user:', error)); 
};

function addEventListeners() {
    fetch('http://localhost:5000/api/users')
    .then(res => {
      return res.json();
    })
    .then(data => {
    //Edit Buttons
    document.querySelectorAll('.edit-button').forEach((button, index) => {
        button.addEventListener('click', function() {
            let user = data[index];
            document.getElementById('editName').value = user.username;
            document.getElementById('editEmail').value = user.email;
            document.getElementById('editPass').value = user.password;
            INDEX = user.id; // Use the user ID instead of the index
        });
    });

    //Delete buttons
    document.querySelectorAll('.delete-button').forEach((button, index) => {
        button.addEventListener('click', function() {
            INDEX = data[index].id; // Use the user ID instead of the index
        });
    });
})
.catch(error => console.error('Error fetching users for event listeners:', error));
}

function displayusers(){
    fetch('http://localhost:5000/api/users')
    .then(res => {
      return res.json();
    })
    .then(data => {
    
        const table = document.getElementById('tableBody');
        table.innerHTML = '';
        data.forEach((user, index) => {
            let HTMLString = `         
            <tr class="table-dark border border-primary" id="user${index}>
            <th scope="row"></th>
            <td>${user.id}</td>
            <td>${user.username}</td>
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
    })
    .catch(error => console.error('Error fetching the users:' , error));
}
//Display users when the page loads
window.addEventListener('load', displayusers);