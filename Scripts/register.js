const elUsername = document.getElementById('username');
const elEmail = document.getElementById('validationEmail');
const elPassword = document.getElementById('password');
const btnRegister = document.getElementById('btnRegister');
const form = document.getElementById('form');



//Immediately Invoked Function Expression (IIFE):  The function is immediately executed once the JavaScript file is loaded.
(function () {
  // 'use strict'; is a directive that enforces stricter parsing and error handling in JavaScript. It helps to catch common coding mistakes and improves overall code quality.
  'use strict';

  const passwordValidate = (pass) => {
    //Check the password   
    if (!pass.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,12}$/)) { 
          if (pass === "") {
            return "This field is required";
          }
          else if (pass.length > 12) {
              return "Password is too lengthy maximum of 12 characters";
          } else if (pass.length < 8) {
              return "Password is too short minimum of 8 characters"; 
            }

          let hasLowerCase = /[a-z]/.test(pass);
          let hasUpperCase = /[A-Z]/.test(pass);
          let hasDigit = /[\d]/.test(pass);
          let hasSpecialChar = /[!@#$%^&*.?]/.test(pass);
      
          if (!hasLowerCase) {
              return "Password must contain at least one lowercase letter";
          }
          if (!hasUpperCase) {
              return "Password must contain at least one uppercase letter";
          }
          if (!hasDigit) {
              return "Password must contain at least one digit";
          }
          if (!hasSpecialChar) {
              return "Password must contain at least one special character";
          }  
        }
     else {
      return "";
    }
  } 

  const forms = document.querySelectorAll('.requires-validation');
  //Array.from(forms): This converts the forms collection into a regular-array. 
  //ForEach: It iterates over each form element and attaches an event listener to it.
    //Inside the function, each form element is represented by the parameter form, which you can use to access properties and methods of that form.
  Array.from(forms).forEach(function (form) {
    form.addEventListener('submit', function (event) {
      let allFieldsValid =  true;
      //form.checkValidity(): This is a method available on HTML form elements. It checks the validity of the form according to its constraints, such as required fields, min and max values, and pattern matching. It returns true if the form is valid and false if it's not.
      if (!form.checkValidity()) {  
        //event.preventDefault(): This method prevents the default behavior of an event. In this case, it prevents the default behavior of the form submission. If the form is not valid 
        event.preventDefault();
        //event.stopPropagation(): This method stops the propagation of the current event in the capturing and bubbling phases. It's commonly used to prevent the event from reaching other elements or event handlers. In this context, it ensures that the event doesn't propagate further up the DOM tree, potentially triggering other event handlers or behaviors associated with ancestor elements.
        event.stopPropagation();
        // Loop through each field/element in the form to check validity
        Array.from(form.elements).forEach(function (field) {
          const errorDiv = field.nextElementSibling;
          if (!field.checkValidity()) {
            //Add thje invalid class to the field that failed it's validation
            field.classList.add('is-invalid');
            //Update the text content of the next sibling(ERROR DIV)          
            if (field.validity.valueMissing) {
              errorDiv.textContent = 'This field is required.';
            } else if (field.type === 'email' && field.validity.typeMismatch) {
              errorDiv.textContent = 'Please enter a valid email address.';
            } else if (field.type === 'text' && field.validity.tooShort) {
              errorDiv.textContent = 'Username must be longer than 3 characters.';
            }
            allFieldsValid =  false;
          } else if (field.checkValidity() && field.type !== 'submit' && field.type !== 'password'){
            // Set field state to valid
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');

            errorDiv.textContent = 'Looks Good';
            errorDiv.classList.remove('invalid-feedback');
            errorDiv.classList.add('valid-feedback');
            console.log(' this should only be logged if a field is valid');
        }
          
          if (field.type === 'password'){
            const passResult = passwordValidate(field.value);
           if (passResult){
           field.classList.add('is-invalid');
            errorDiv.classList.add('invalid-feedback');
            //Update the text content of the next sibling(ERROR DIV)
            errorDiv.textContent = passResult;
            console.log('Password is NOT valid');
            allFieldsValid =  false;
            }else {
              field.classList.remove('is-invalid');
              field.classList.add('is-valid');
              errorDiv.classList.remove('invalid-feedback');
              errorDiv.classList.add('valid-feedback');
              errorDiv.textContent = 'Looks Good';
              console.log('Password is valid');
            }
          }
    });

    if (allFieldsValid) {
      addUser();
    }
  }
      form.classList.add('was-validated');
    }, false);
  });
})();



const addUser = () => {
  alert('User add function runnig');
  let arrUsers = JSON.parse(localStorage.getItem('users')) || [];
  let valState = false;
  let newUser = {
        name: elUsername.value,
        email: elEmail.value,
        password: elPassword.value
  }

    if (arrUsers.length !== 0) {
        arrUsers.forEach(user => {
            if (user.email === newUser.email){
              valState = true;
            }else { 
              valState = false;
              arrUsers.push(newUser);
              localStorage.setItem('users', JSON.stringify(arrUsers));
            }
        });
      }else{
        valState = false;
        arrUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(arrUsers));
      }

      if (valState === true){
        btnRegister.nextElementSibling.classList.remove('hidden');
      }else {
        btnRegister.nextElementSibling.classList.add('hidden');
      }
  };
    

//btnRegister.addEventListener('click',  addUser());