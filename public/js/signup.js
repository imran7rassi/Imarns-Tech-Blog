
// this is the sign up form handler 
// we use the async function and prevent the default
const signupFormHandler = async function(event) {
    event.preventDefault();
  
    // the username and the password to 
    // enter the username and password
    const username = document.querySelector('#username-input-signup').value.trim();
    const password = document.querySelector('#password-input-signup').value.trim();

    console.log(username);
    console.log(password);

    // fetch the user from the api
    // the method is post method
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({
        username, password
      }),

      headers: { 'Content-Type': 'application/json' },
    });
  
    // if the response is OK so 
    // replace to the dashboard
    // otherwise prompt an alert
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to sign up');
    }

  };
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);