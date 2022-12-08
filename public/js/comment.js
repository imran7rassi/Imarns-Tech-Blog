
// this is the comment handler function
// to use the prevent default
const commentFormHandler = async function(event) {
    event.preventDefault();
  
    // connecting the postID to post-id
    const postId = document.querySelector('input[name="post-id"]').value;
    // from the body requires the textarea //
    const body = document.querySelector('textarea[name="comment-body"]').value;
  
    // fetch the api of comment //
    if (body) {
      await fetch('/api/comment', {

        // the method for this is POST //
        method: 'POST',
        body: JSON.stringify({
          postId,
          body
        }),
        headers: {
          'Content-Type': 'application/json'
        }

      });
  
      document.location.reload();
    }
    
  };
  
  document
    .querySelector('#new-comment-form')
    .addEventListener('submit', commentFormHandler);