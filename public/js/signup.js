
// this is the sign up handler to sign up into the app //
const signupFormHandler = async function(event) {
    event.preventDefault();
  
    // connecting the username input signup //
    const usernameEl = document.querySelector("#username-input-signup");
    // connecting the password input sign up //
    const passwordEl = document.querySelector("#password-input-signup");

    // fetch the api of user
    // the method is post method
    // we use the username and password
    fetch("/api/user", {
      method: "post",
      body: JSON.stringify({
        username: usernameEl.value,
        password: passwordEl.value
      }),

      headers: { "Content-Type": "application/json" }
    })

    // if t's done so put it in the dashboard
      .then(function() {
        document.location.replace("/dashboard");
      })
      
      // otherwise get an err //
      .catch(err => console.log(err));
  };
  
  document
    .querySelector("#signup-form")
    .addEventListener("submit", signupFormHandler);