const form = document.querySelector('form');


form.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const id = document.location.pathname.split('/').pop();

    const response = await fetch(`api/post/${id}`, {
      method: 'DELETE',
      
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post.');
    }
  });
  
  
  