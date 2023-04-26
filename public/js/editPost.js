 // Add event listener to edit
 form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const titleElement = document.querySelector
    
    const updatedPost =
    {
      title: titleInput.value,
      content: contentInput.value
      
    };
    console.log(updatedPost);

    const response = await fetch('api/chat/edit/{:id}, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(updatedPost),
    })


    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create a new post.');
    }
  });