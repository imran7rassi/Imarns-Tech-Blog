
// this is the function to logout
function logout() {

  // fetch the api of user logout
  // and the method is POST method
    fetch("/api/user/logout", {
      method: "post",
      headers: { "Content-Type": "application/json" }
    })

      .then(function() {
        document.location.replace("/");
      })
      
      .catch(err => console.log(err));
  }
  
  document.querySelector("#logout-link").addEventListener("click", logout);