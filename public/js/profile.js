let id;

const newFormHandler = async(event) => {
    event.preventDefault();

    const name = document.querySelector('#workout-name').value.trim();
    const comment = document.querySelector('#workout-comment').value.trim();
    console.log(name, comment)

    if (name && comment) {
        const response = await fetch(`/api/workout`, {
            method: 'POST',
            body: JSON.stringify({ name, workout, workout_id: id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/workout/4');
        } else {
            document.location.replace('/login');
        }
    }
};

const delButtonHandler = async(event) => {
    if (event.target.hasAttribute('data-id')) {
        id = event.target.getAttribute('data-id');
        console.log(id)
            // const response = await fetch(`/api/reviews/${id}`, {
            //     method: 'DELETE',
            // });

        // if (response.ok) {
        //     document.location.replace('/');
        // } else {
        //     alert('Failed to delete review');
        // }
    }
};

document
    .querySelector('.new-workout-form')
    .addEventListener('submit', newFormHandler);

document
    .querySelector('.card-body')
    .addEventListener('click', delButtonHandler);