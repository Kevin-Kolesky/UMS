const elUsername = document.getElementById('username');
const elEmail = document.getElementById('email');
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
  Array.from(forms).forEach(function (form) {
    form.addEventListener('submit', function (event) {

      event.preventDefault();

      event.stopPropagation();

      let allFieldsValid = true;
      if (!form.checkValidity()) {

        Array.from(form.elements).forEach(function (field) {
          if (field.type === 'password') {

            const passResult = passwordValidate(document.getElementById('password').value);
            const errorDiv = field.nextElementSibling;

            if (passResult) {
              field.classList.add('is-invalid');

              errorDiv.classList.add('invalid-feedback')
              errorDiv.textContent = passResult;

              allFieldsValid = false;
            } else {
              field.classList.remove('is-invalid');
              field.classList.add('is-valid');
              errorDiv.textContent = 'Looks Good';
              errorDiv.classList.remove('invalid-feedback');
              errorDiv.classList.add('valid-feedback');
            }
          } else if (!field.checkValidity()) {

            field.classList.add('is-invalid');

            const errorDiv = field.nextElementSibling;

            errorDiv.classList.remove('valid-feedback');
            errorDiv.classList.add('invalid-feedback');

            allFieldsValid = false;

            if (field.validity.valueMissing) {
              errorDiv.textContent = 'This field is required.';
            } else if (field.type === 'email' && field.validity.typeMismatch) {
              errorDiv.textContent = 'Please enter a valid email address.';
            } else if (field.type === 'text' && field.validity.tooShort) {
              errorDiv.textContent = 'Username must be longer than 3 characters.';
            }
          } else {
            if (field.type !== 'submit' && field.type !== 'password') {
              field.classList.remove('is-invalid');
              field.classList.add('is-valid');

              const errorDiv = field.nextElementSibling;

              errorDiv.textContent = 'Looks Good';
              errorDiv.classList.remove('invalid-feedback');
              errorDiv.classList.add('valid-feedback');

            }
          }
        });
      } else {
        Array.from(form.elements).forEach(function (field) {
          const errorDiv = field.nextElementSibling;

          if (field.type !== 'submit') {

            field.classList.remove('is-invalid');
            field.classList.add('is-valid');

            errorDiv.classList.remove('invalid-feedback');
            errorDiv.classList.add('valid-feedback');
            errorDiv.textContent = 'Looks Good';
          }
        });
      }
      if (allFieldsValid) {
        event.preventDefault();
        if (addUser()) {
          console.log('going to dashboard now')
          window.location.href = "dashboard.html";
        };
      }
      form.classList.add('was-validated');
    }, false);
  });
})();



async function addUser() {
  let valState = false;
  let newUser = {
    username: elUsername.value,
    email: elEmail.value,
    password: elPassword.value
    };

    data = await (await fetch('http://localhost:5000/api/users')).json();
    if (data.length !== 0) {
        data.forEach(user => {
          if (user.email !== newUser.email && valState === false) {
            valState = false;
          } else {
            valState = true;
          }
        });
      } else {
        valState = false;
      }

      if (valState) {
        btnRegister.nextElementSibling.classList.remove('hidden');
        return false;
      } else {
        btnRegister.nextElementSibling.classList.add('hidden');
        //ADD new User
       const response = await fetch('http://localhost:5000/api/post', {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUser)
        });
        const result = await response.json();
        console.log(result);
        console.log('user added successfully')
        return true;
      }
    };



