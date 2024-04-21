const elUsername = document.getElementById('');
const elEmail = document.getElementById('');
const elPassword = document.getElementById('');
const btnRegister = document.getElementById('');

btnRegister.addEventListener('click', () => {
    arrUsers = JSON.parse(localStorage.getItem('Users')) || [];

   let user = {
        name: elUsername.value,
        email: elEmail.value,
        password: elPassword.value
    }
    
    userExists(arrUsers,user);
    userValidate(user);

    arrUsers.push(user);
    localStorage.setItem('Users', JSON.stringify(arrUsers));
    }
)

const userExists = (Users, newUser) =>{
    if (Users.length !== 0) {
        Users.forEach(user => {
            if (user.email === newUser.email){
                return true
            }else {
                return false;
            }
        });
    }else{
        return false;
    }
};

const userValidate = (newUser) =>{
    if (newUser.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {

        if (newUser.password.match()) {
            const strength = { 
                1: "very Weak", 
                2: "Weak", 
                3: "Meduim", 
                4: "Strong"
            }
            
            function checkStrength(pass) { 
                if (pass.length > 15) {
                    return console.log( 
                        pass + " Password is too lengthy"
                    ); 

                    //return false;
                } else if (pass.length < 8) 
                    return console.log( 
                        pass + " Password is too short"
                    ); 
            
                let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
                if (regex.test(pass)) { 
                    return console.log(pass + " Password is strong"); 
                   // return true
                } 

                let count = 0; 
                let regex1 = /[a-z]/; 
                if (regex1.test(pass)) count++; 

                let regex2 = /[A-Z]/; 
                if (regex2.test(pass)) count++; 

                let regex3 = /[\d]/; 
                if (regex3.test(pass)) count++; 
                
                let regex4 = /[!@#$%^&*.?]/; 
                if (regex4.test(pass)) count++; 
              
                console.log(pass, "Pasword is " + strength[count]);  
}; 

          }else {

            return false;
          }
    }else {
      alert("Invalid email address!");
      document.elEmail.focus();
      return false;
    }
  };

