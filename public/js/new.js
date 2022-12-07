
// this is the function for async the 
// new form handler
const newFormHandler = async function(event) {
    event.preventDefault();
  
    // this is the posttitle and the postcontent
    const postTitle = document.querySelector('input[name="post-title"]').value;
    const postContent = document.querySelector('textarea[name="post-body"]').value;
  
    console.log(postTitle);
    console.log(postContent);
  
    // there we fetch the post //
    // the metod is the post method //
    await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify({
        postTitle,
        postContent,
      }),
      
      headers: { 'Content-Type': 'application/json' },
    });
  
   
  };
  
  document
    .querySelector('#new-post-form')
    .addEventListener('submit', newFormHandler);