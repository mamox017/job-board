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
	const formData = new FormData(form);
	const employer = formData.get('name');
	const title = formData.get('title');
	const description = formData.get('desc');
	const link = formData.get('applink');

	console.log(employer);
	console.log(title);
	console.log(description);
	console.log(link);

	if (employer.trim() && title.trim() && link.trim()){
		errMsg.style.display = 'none';
		jobs.style.display = 'none';
		load.style.display = '';

		const job = {
			employer,
			title,
			description,
			link
		};

		fetch(API_URL, {
	      method: 'POST',
	      body: JSON.stringify(job),
	      headers: {
	        'content-type': 'application/json'
	      }
		}).then(response => response.json()).then(createdJob => {
				console.log(createdJob);
			})
	}
})

function listjobs() {
	jobs.innerHTML = '';
	fetch(API_URL)
		.then(response => response.json())
		.then(jobiter => {
			jobiter.reverse();
			jobiter.forEach(job => {
				const div = document.createElement('jobs');
				const header = document.createElement('h2');
				header.textContent = "- Position: " + job.title;
				const emplisting = document.createElement('h5');
				emplisting.textContent = "- Company: " + job.employer;
				const desc = document.createElement('p');
				desc.textContent = "- " + job.description;
				const joblink = document.createElement('p');
				joblink.textContent = "- URL: " + job.link;
				const jobpost = document.createElement('p');
				jobpost.textContent = "Posted on: " + new Date(job.posted);
				const divider = document.createElement('small');
				divider.textContent = "___________________________________________________________________________________________________________________________________________________________________________________________________________________";
				div.appendChild(header);
				div.appendChild(emplisting);
				div.appendChild(desc);
				div.appendChild(joblink);
				div.appendChild(jobpost);
				div.appendChild(divider);
				jobs.appendChild(div);
			})
			load.style.display = 'none';
		});
}