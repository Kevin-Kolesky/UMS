# UMS User Management System Project

## Phase 1

### Create HTML Pages:
1. Create four HTML files: index.html, register.html, login.html, and
dashboard.html.
  - index.html: Main page with options to login or register.
  - register.html: User registration page with a form to input first name, last name, email, date of birth, username, and password.
  - login.html: User login page with a form to input username and password.
  - dashboard.html: Dashboard page to display registered user data in a table format.

### Design CSS Styles:
2. Create a styles.css file to define the styles for all HTML pages.
  - Style the layout, buttons, forms, and tables to make the pages visually appealing and user-
    friendly.

### Implement JavaScript Functionality:
3. Create three JavaScript files: register.js, login.js, and dashboard.js.

  - register.js: Implement functionality to handle user registration. When the
    registration form is submitted, save the user's personal information along with the
    username-password pair in localStorage and redirect to the dashboard page.

  - login.js: Implement functionality to handle user login. When the login form is
    submitted, check if the entered username and password match the data stored in
    localStorage. If successful, redirect to the dashboard page; otherwise, display an error
    message.

  - dashboard.js: Implement functionality to display user data in the dashboard. Upon
    page load, retrieve all stored user information from localStorage and display it in a table
    format on the dashboard page.

## Phase 2

### Create Main.js
1. Create a main.js file that will store the backend(API) code

### Create a mysql database
2. The database must contain 1 table with the following columns
   - id
   - username
   - email
   - password

### Replace local storage with API
3. Replace the local storage functionality implemented in phase 1 with the API.
  - Only the API should be in use on the site

### Encrypt the user's password
4. Find and use a package to encrypt user passwords with a hash
   -Remove the password update functionality from the frontend
   
