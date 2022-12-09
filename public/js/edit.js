
// this is the edit form handler to edit the post //
const editFormHandler = async function(event) {
    event.preventDefault();

    // getting the post title
    const titleEl = document.getElementById('post-title');
    // getting the post body
    const bodyEl = document.getElementById('post-body');
    // getting the post id
    const postId = document.getElementById('post-id')

    // fetch the post api 
    // and the method for updating the post is PUT method //
    fetch("/api/post/" + postId.value, {
        method: "put", 
        body: JSON.stringify({
            title: titleEl.value,
            body: bodyEl.value
        }),

        headers: { "Content-Type": "application/json"}
    })

        .then(function() {
            document.location.replace("/dashboard");
        })
        // getting an err //
        .catch(err => console.log(err))
}

document.querySelector("#edit-post-form").addEventListener("submit", editFormHandler);

