const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#workout-name').value.trim();
    
    const description = document.querySelector('#workout-desc').value.trim();
  
    const story = document.querySelector('#workout-story').value.trim();
  
    if (name && description && story) {
      const response = await fetch(`/api/workouts`, {
        method: 'POST',
        body: JSON.stringify({ name, description, story }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create workout');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/workouts/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete workout');
      }
    }
  };
  
  document
    .querySelector('.new-workout-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.workout-list')
    .addEventListener('click', delButtonHandler);
  