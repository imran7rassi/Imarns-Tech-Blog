
// this is the login handler to do the login 
const loginFormHandler = async function(event) {
    event.preventDefault();
  
    // connecting the username input login //
    const usernameEl = document.querySelector("#username-input-login");
    // connecting the password input login //
    const passwordEl = document.querySelector("#password-input-login");

    // fetch the api of user and login
    // the method for this is the post method
    fetch("/api/user/login", {
      method: "post",
      body: JSON.stringify({
        username: usernameEl.value,
        password: passwordEl.value
      }),

      headers: { "Content-Type": "application/json" }
    })

      .then(function() {
        document.location.replace("/dashboard");
      })
      
      .catch(err => console.log(err));
  };
  
  document
    .querySelector("#login-form")
    .addEventListener("submit", loginFormHandler);