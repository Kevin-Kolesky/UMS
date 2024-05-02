
let arrUsers = JSON.parse(localStorage.getItem('users')) || [];

/*      <tr class="table-dark border border-primary">
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto@otto.com</td>
        <td>*****</td>
        <td><button type="button" class="btn btn-primary">Primary</button>
          <button type="button" class="btn btn-danger">Danger</button></td>
      </tr>
*/



function displayusers() {
    const table = document.getElementById('tableBody');
    table.innerHTML = '';
    arrUsers.forEach((user, index) => {
        let HTMLString = `         
        <tr class="table-dark border border-primary" id="user${index}>
        <th scope="row">1</th>
        <td>${index + 1}</td>
        <td>${user.userame}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td>                
            <button type="button" class="edit-button btn btn-warning float-start" id="edit${index}">
            <?xml version="1.0" ?>
            <svg class="feather feather-edit" fill="none" height="20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
            <button type="button"  class="delete-button danger-button btn-danger btn" aria-label="Close" id="edit${index}">
            <?xml version="1.0" ?>
            <svg class="feather feather-trash" fill="none" height="20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
      </tr>
      `;
        table.insertAdjacentHTML('beforeend', HTMLString);
    });

    // Attach event listeners for edit and delete buttons
    document.querySelectorAll('.edit-button').forEach((button, index) => {
        button.addEventListener('click', function() {
            UpdateState = index; // Set the update state to the index of the item being edited
            document.getElementById('todo-input').value = users[index]; // Fill input with current item text
            btnAdd.innerHTML = 'Update';
            btnAdd.classList.remove('btn-primary');
            btnAdd.classList.add('btn-success');
            document.getElementById('todo-input').focus();
        });
    });

    document.querySelectorAll('.delete-button').forEach((button, index) => {
        button.addEventListener('click', function() {
            users.splice(index, 1);
            localStorage.setItem('users', JSON.stringify(users));
            displayusers(); // Update display after deletion
        });
    });
}

// Display users when the page loads
window.addEventListener('load', displayusers);