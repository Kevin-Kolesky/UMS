
const elEmail = document.getElementById('email');
const elPassword = document.getElementById('password');
const btnLogin = document.getElementById('btnLogin');
const form = document.getElementById('form');

//Immediately Invoked Function Expression (IIFE):  The function is immediately executed once the JavaScript file is loaded.
(function () {
    // 'use strict'; is a directive that enforces stricter parsing and error handling in JavaScript. It helps to catch common coding mistakes and improves overall code quality.
    'use strict';

    const forms = document.querySelectorAll('.requires-validation');
    Array.from(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            event.stopPropagation();

            let allFieldsValid = true;
            if (!form.checkValidity()) {
                Array.from(form.elements).forEach(function (field) {
                    const errorDiv = field.nextElementSibling;
                    if (!field.checkValidity()) {
                        allFieldsValid = false;

                        field.classList.add('is-invalid');
                        errorDiv.classList.remove('valid-feedback');
                        errorDiv.classList.add('invalid-feedback');

                        if (field.validity.valueMissing) {
                            errorDiv.textContent = 'This field is required.';
                        } else if (field.type === 'email' && field.validity.typeMismatch) {
                            errorDiv.textContent = 'Please enter a valid email address.';
                        }
                    } else if (field.type !== 'submit') {
                        // Set field state to valid
                        field.classList.remove('is-invalid');
                        field.classList.add('is-valid');
                        errorDiv.classList.remove('invalid-feedback');
                        errorDiv.classList.add('valid-feedback');
                        errorDiv.textContent = 'Looks Good';
                    }
                });
            } else {
                Array.from(form.elements).forEach(function (field) {
                    const errorDiv = field.nextElementSibling;
                    if (field.type !== 'submit') {
                        // Set field state to valid
                        field.classList.remove('is-invalid');
                        field.classList.add('is-valid');
                        errorDiv.classList.remove('invalid-feedback');
                        errorDiv.classList.add('valid-feedback');
                        errorDiv.textContent = 'Looks Good';
                    }
                });
            }

            if (allFieldsValid) {
                event.preventDefault(); // Prevent default form submission
                console.log(checkUser());
                if (checkUser()) {
                    window.location.href = "dashboard.html";
                };
            }
            form.classList.add('was-validated');
        }, false);
    });
})();



function checkUser() {
    let arrUsers = JSON.parse(localStorage.getItem('users')) || [];
    let userEmail = elEmail.value;
    let userPassword = elPassword.value;
    const errorDiv = btnLogin.nextElementSibling;

    if (arrUsers.length !== 0) {
        /* Using  'Array.prototype.some()' instead of 'forEach()'. 'some()' will return true immediately when it finds a
        matching user and will stop iterating through the array. Here's your code modified to use some(): */
        let userFound = arrUsers.some(user => {
            return userEmail === user.email && userPassword === user.password;
        });

        if (userFound) {
            console.log(`User Found ${userEmail}`);
            return true;
        } else {
            errorDiv.classList.remove('hidden');
            console.log('User not found after loop');
            return false;
        }
        /* In JavaScript, the return statement inside a forEach loop doesn't actually return a value from 
        the outer function (checkUser in this case). Instead, it just exits the current iteration of the loop.

        let valState = false;
        arrUsers.forEach(user => {
            if ((userEmail === user.email) && (userPassword === user.password)) {
                console.log(`User Found ${userEmail}`);
                return true;
            }else
            {
                valState = true;
            }
        });

        if (valState === true){
            errorDiv.classList.remove('hidden');
            console.log('User not found after loop');
            return false;
        }*/
    } else {
        errorDiv.classList.remove('hidden');
        console.log('User not found because array is empty');
        return false;
    }
}