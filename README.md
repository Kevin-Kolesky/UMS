# UMS User Management System Project

# Create HTML Pages:
1. Create four HTML files: index.html, register.html, login.html, and
dashboard.html.
1.1 index.html: Main page with options to login or register.
1.2 register.html: User registration page with a form to input first name, last name, email, date of birth, username, and password.
1.3 login.html: User login page with a form to input username and password.
1.4 dashboard.html: Dashboard page to display registered user data in a table format.

# Design CSS Styles:
2. Create a styles.css file to define the styles for all HTML pages.

2.1 Style the layout, buttons, forms, and tables to make the pages visually appealing and user-
friendly.

# Implement JavaScript Functionality:
3. Create three JavaScript files: register.js, login.js, and dashboard.js.

3.1 register.js: Implement functionality to handle user registration. When the
registration form is submitted, save the user's personal information along with the
username-password pair in localStorage and redirect to the dashboard page.

3.2 login.js: Implement functionality to handle user login. When the login form is
submitted, check if the entered username and password match the data stored in
localStorage. If successful, redirect to the dashboard page; otherwise, display an error
message.

3.3 dashboard.js: Implement functionality to display user data in the dashboard. Upon
page load, retrieve all stored user information from localStorage and display it in a table
format on the dashboard page.