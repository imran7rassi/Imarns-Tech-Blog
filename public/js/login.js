
// this is the login formhandler //
const loginFormHandler = async function(event) {
    event.preventDefault();
  
    // the username and it's password input //
    const usernameEl = document.querySelector('#username-input-login');
    const passwordEl = document.querySelector('#password-input-login');
  
    // fetch the login api //
    // the metod for this is post //
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({
        username: usernameEl.value,
        password: passwordEl.value,
      }),

      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {

      alert('Failed to login');

    }
    
  };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);