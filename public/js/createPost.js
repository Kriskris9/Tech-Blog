
const form = document.querySelector('form');
const titleInput = document.querySelector('#title')
const contentInput = document.querySelector('#content')
console.log("help")
  // Add event listener to submit a new chat
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
console.log("hello help sosos");

    const newPost =
    {
      title: titleInput.value,
      content: contentInput.value,
      // date_created: dateCreated.value,

    };
    console.log(newPost);

    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(newPost),
    })


    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create a new post.');
    }
  });

