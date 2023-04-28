
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const titleElement = document.querySelector('#title');
  const contentElement = document.querySelector('#content');
  const id = document.location.pathname.split('/').pop();
  console.log(titleElement)
  console.log(contentElement)


  const updatedPost = {
    title: titleElement.value,
    content: contentElement.value 
    };

  const response = await fetch(`api/post/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedPost)
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to update post.');
  }
});


