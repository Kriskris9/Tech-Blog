    const form = document.querySelector('.new-comment-form');
    const comment= document.querySelector('#comment');
    const postId = document.querySelector('#postId')



 
  // Add event listener to submit a new chat
  form.addEventListener('submit', async (event) => {
    event.preventDefault();


    const newComment =
    {
      comment: comment.value,
      post_id: postId.value,

    };
    console.log(newComment);

    const response = await fetch('api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(newComment),
    })


    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to create a new comment.');
    }
  });

