import express from 'express';
const app = express();
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import db from './controllers/db';
import gradeTopoicChallenges from './config/gradeTopicChallenges'

import {
  createActivity,
  createAndLoginPerson,
  createGrade,
  createCompletedAttempt,
  wipeUserData,
  logoutPerson,
  loginPerson,
  getAllAttempts
} from './controllers/queries';

import auth from './middleware/auth';

const server = new http.Server(app);

app.use(cors());

app.use(express.json());

// Initialize db
db.init(async () => {

  // Load grades and activities
  for (const grade of gradeTopoicChallenges) {
    await createGrade(grade.name);
    for (const topics of grade.topics) {
      for (const challenge of topics.challenges) {
        await createActivity(challenge.name);
      }
    }
  }

  if (process.env.ENVIRONMENT === 'DEV') {
    await wipeUserData();
    await createAndLoginPerson('Ruan Huysen', 'rhuysen@gmail.com', '.86Lepos3');
    await logoutPerson('rhuysen@gmail.com');
    await createCompletedAttempt('Grade 9', 'rhuysen@gmail.com', 'Basic Integers');
    await createCompletedAttempt('Grade 12', 'rhuysen@gmail.com', 'Basic Power rule');
    console.log('Test database init complete');
  }

});

app.get('/', async (req, res) => {
  try {
    res.status(200).send({thisThing: 'Is working'})
  } catch (e) {
    console.log(e);
  }
});

// Creates a new user and logs them in.
app.post('/person', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).send();
    }
    const person = await createAndLoginPerson(name, email, password);
    if (person.error) {
      res.status(400).send();
    }
    res.status(200).send(person);
  } catch (e) {
    console.log('ERROR in index.post:/person');
    console.log(e);
    res.status(400).send();
  }
})

// Log in user.
app.post('/person/login', async (req, res) => {
  try {
    const person = await loginPerson(req.body.email, req.body.password);
    if (person.error && !person.id) {
      return res.status(400).send({ error: person.error })
    }
    const completedActivities = await getAllAttempts(person.id);
    res.status(200).send({
      name: person.name,
      email: person.email,
      token: person.token,
      completedActivities
    });
  } catch (e) {
    console.log('ERROR in index.post:/person/login');
    console.log(e);
    res.status(400).send();
  }
});

// Logs out user
app.post('/person/logout', auth, async (req, res) => {
  try {
    await logoutPerson(req.header('Authorization').replace('Bearer ', ''));
    res.status(200).send();
  } catch (e) {
    console.log('ERROR in index.post:/person/logout');
    console.log(e);
    res.status(400).send();
  }
})

// Posts completed activity - get all completed activities in response

app.post('/activity', auth, async (req, res) => {
  try {
    const gradeName = req.body.gradeName;
    const email = req.body.email;
    const activityName = req.body.activityName;
    if (!gradeName || !email || !activityName) {
      return res.status(400).send();
    }
    await createCompletedAttempt(gradeName, email, activityName);

    const attempts = await getAllAttempts(req.person.id);
    res.status(200).send(attempts);
  } catch (e) {
    console.log('data is wrong second]', { body: req.body });
    console.log('ERROR in index.post:/activity');
    console.log(e);
    res.status(400).send();
  }
})

// Gets all completed activities
app.get('/activity', auth, async (req, res) => {
  try {
    const response = await getAllAttempts(req.person.id);
    res.status(200).send(response);
  } catch (e) {
    console.log('ERROR in index.get:/activity');
    console.log(e);
    res.status(404).send();
  }
})


server.listen(process.env.PORT, async () => {
  console.log('Listening on ' + process.env.PORT);
});
