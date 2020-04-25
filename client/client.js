console.log('Hello World!');

const form = document.querySelector('.job_form');
const load = document.querySelector('.load_img');

load.style.display = 'none';
form.addEventListener('submit', (event) => {
	event.preventDefault();
	load.style.display = '';

})

