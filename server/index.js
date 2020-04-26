//imports
const express = require('express');
const cors = require('cors');
const monk = require('monk');
const Filter = require('bad-words');
const rateLimit = require("express-rate-limit");

//ExpressJS framework
const app = express();

//setup db
const db = monk('localhost/jobsdb');
const dbjobs = db.get('jobz');
const filter = new Filter();

app.enable("trust proxy");

//parses incoming json
app.use(cors());
app.use(express.json());

//get route for /
app.get('/', (req, res) => {
  //reponse action
  res.json({
    message: 'job-board placeholder!'
  });
});


app.get('/jobs', (req, res) => {
	jobs.find().then(jobs => {
		res.json(jobs);
	})
});

function isValidPosting(job) {
	return job.employer && job.employer.toString().trim() !== '' &&
	job.title && job.title.toString().trim() !== '' &&
	job.description && job.description.toString().trim() !== '' &&
	job.link && job.link.toString().trim() !== '';
}

//post route for /jobs
app.post('/jobs', (req, res) => {
	//validating received json has fields filled
	if (isValidPosting()) {
		//insert into db
		console.log("Trying to parse job");
		console.log(req.body.employer.toString);
		//parse json into job struct
		const job = {
			employer: req.body.employer.toString(),
			title: req.body.title.toString(),
			description: req.body.description.toString(),
			link: req.body.link.toString(),
			posted: new Date()
		}

		//inserts to database and responds back to client with
		//what was created

		dbjobs.insert(job)
		.then(createdJob => {
			//responds back with createdJob
			//so that front end can list it
			res.json(createdJob);
		});

	} else {
		res.status(422); //error not valid
		res.json({
			message: 'Hey! Required fields not given!'
		})
	}
});

app.use((error, req, res, next) => {
  res.status(500);
  res.json({
    message: error.message
  });
});

app.listen(5000, () => {
  console.log('Listening on http://localhost:5000');
});