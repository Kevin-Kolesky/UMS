
const elUsername = document.getElementById('');
const elEmail = document.getElementById('validationEmail');
const elPassword = document.getElementById('');
const btnRegister = document.getElementById('btnRegister');
const form = document.getElementById('form');


function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);



const formValidate = () => {
  let newUser = {
    email: elEmail.value
  }

  //Set check counter
  let check = 0;
  //Check the email
  if (newUser.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
    check++;
    elEmail.insertAdjacentHTML('afterend', '<div id="validationEmailFeedback" class="invalid-feedback">Please enter a valid email.</div>')
  }else {
    elEmail.insertAdjacentHTML('afterend', 
    `<div id="validationEmailFeedback" class="invalid-feedback">Please enter a valid email.</div>`)
  
    document.getElementById('validationEmail').focus();
    return;
  }
}

btnRegister.addEventListener('click', formValidate);
//() => {
//     arrUsers = JSON.parse(localStorage.getItem('Users')) || [];

//    let user = {
//         name: elUsername.value,
//         email: elEmail.value,
//         password: elPassword.value
//     }
    
//     userExists(arrUsers,user);
//     userValidate(user);

//     arrUsers.push(user);
//     localStorage.setItem('Users', JSON.stringify(arrUsers));
//     }
// )

// const userExists = (Users, newUser) =>{
//     if (Users.length !== 0) {
//         Users.forEach(user => {
//             if (user.email === newUser.email){
//                 return true
//             }else {
//                 return false;
//             }
//         });
//     }else{
//         return false;
//     }
// };
