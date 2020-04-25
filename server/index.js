const express = require('express');
const cors = require('cors');
const monk = require('monk');
const Filter = require('bad-words');
const rateLimit = require("express-rate-limit");

const app = express();

const db = monk('localhost/jobsdb');
const dbjobs = db.get('jobz');
const filter = new Filter();

app.enable("trust proxy");

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'job-board placeholder'
  });
});