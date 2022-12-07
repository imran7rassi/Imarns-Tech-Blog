
const postId = document.querySelector('input[name="post-id"]').value;
console.log("testing");
console.log(postId);

// this is the editformhandler array //
const editFormHandler = async (event) => {
  event.preventDefault();

  const postTitle = document.querySelector('input[name="post-title"]').value;
  const postContent = document.querySelector('textarea[name="post-body"]').value;

  console.log(postTitle);

  console.log(postContent);

  const response = await fetch(`/api/post/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({
      postTitle,
      postContent,
    }),

    headers: {
      'Content-Type': 'application/json'
    }

  });

  // if the response is ok
  // so got to the dashboard page
  // otherwise prompt an alert

  console.log(response);
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to update your post');
  }

  document.location.replace('/dashboard');

};

// this is the delete click handler 
// the method for this handler is DELETE

const deleteClickHandler = async () => {
  await fetch(`/api/post/${postId}`, {
    method: 'DELETE'
  });

  document.location.replace('/dashboard');
};


document
  .querySelector('#edit-post-form')
  .addEventListener('submit', editFormHandler);
  
document
  .querySelector('#delete-btn')
  .addEventListener('click', deleteClickHandler);