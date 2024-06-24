
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
        form.addEventListener('submit',async function (event) {
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
                if (await checkUser()) {
                 window.location.href = "dashboard.html";
                };
            }
            form.classList.add('was-validated');
        }, false);
    });
})();


async function checkUser() {

    let userEmail = elEmail.value;
    let userPassword = elPassword.value;
    const errorDiv = btnLogin.nextElementSibling;


    try {
        const response = await fetch('http://localhost:5000/api/userCheck', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userEmail,
                password: userPassword
            })
        });

        if (response.ok) {
            return true;
        } else {
            errorDiv.classList.remove('hidden');
            return false;
        }
    } catch (error) {
        errorDiv.classList.remove('hidden');
        return false;
    }
} 
