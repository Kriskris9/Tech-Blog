    const form = document.querySelector('.new-comment-form');
    const comment= document.querySelector('#comment');
    const postId = document.querySelector('#postId')



 
  // Add event listener to submit a new chat
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
  const post = parseInt(postId.value)
    const newComment =
    {
      comment: comment.value,
      post_id: post,

    };
    console.log(newComment);

    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(newComment),
    })


    if (response.ok) {
      document.location.reload(true);
    } else {
      alert('Failed to create a new comment.');
    }
  });

