console.log('Hello World!');

const form = document.querySelector('.job_form');
const load = document.querySelector('.load_img');
const jobs = document.querySelector('.jobs');
const errMsg = document.querySelector('.error-msg');
const API_URL = 'http://localhost:5000/jobs';

load.style.display = 'none';
listjobs();


form.addEventListener('submit', (event) => {
	event.preventDefault();
	const employer = formData.get('name');
	const title = formData.get('title');
	const description = formData.get('name');
	const link = formData.get('applink');

	if (employer.trim() && title.trim() && link.trim()){
		errMsg.style.display = 'none';
		jobs.style.display = 'none';
		loadingElement.style.display = '';

		const job = {
			employer,
			title,
			description,
			link
		};

		fetch(API_URL, {
	      method: 'POST',
	      body: JSON.stringify(mew),
	      headers: {
	        'content-type': 'application/json'
	      }
	    }).then(response => {
			if(!response.ok) {
				const contentType = response.headers.get('content-type');
				if (contentType.includes('json')) {
					return response.json().then(error => Promise.reject(error.message));
				} else {
					return response.text().then(message => Promise.reject(message));
				}
			}
		}).then(() => {
			form.reset();
			listjobs();
		}).catch(errorMessage => {
			jobs.style.display = '';
			errMsg.textContent = errorMessage;
			errMsg.style.display = '';
			load.style.display = 'none';
		});
	} else {
		errMsg.textContent = 'Please fill out the required (*) fields!';
		errMsg.style.display = '';
	}
})

function listjobs() {
	jobs.innerHTML = '';
	fetch(API_URL)
		.then(response => response.json())
		.then(jobiter => {
			jobiter.reverse();
			jobiter.forEach(job => {
				const div = document.createElement('div');

				const header = document.createElement('h2');
				header.textContent = job.title;

				const emplisting = document.createElement('h5');
				emplisting.textContent = job.employer;

				const desc = document.createElement('p');
				desc.textContent = job.description;

				const joblink = document.createElement('p');
				joblink.textContent = job.link;

				div.appendChild(header);
				div.appendChild(emplisting);
				div.appendChild(desc);
				div.appendChild(joblink);

				jobs.appendChild(div);
			})
			loadingElement.style.display = 'none';
		});
}