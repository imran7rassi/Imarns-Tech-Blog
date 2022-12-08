
// this is the new handler to make a new post //
const newFormHandler = async function(event) {
    event.preventDefault();
  
    // connect the post title //
    const title = document.querySelector('input[name="post-title"]').value;
    // connect the post body //
    const body = document.querySelector('textarea[name="post-body"]').value;
  
    // we use token to save this in the localstorage //
    // the method for this is the POST method //
    const token = localStorage.getItem("token");
    await fetch(`/api/post`, {
      method: "POST",
      body: JSON.stringify({
        title,
        body
      }),

      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      }

    });
  
    document.location.replace("/dashboard");
  };
  
  document
  
    .querySelector("#new-post-form")
    .addEventListener("submit", newFormHandler);