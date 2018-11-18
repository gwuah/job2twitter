const sherperd = require('./lib/sherperd');
const bodyParser = require('body-parser');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

function buildJobPosting(body) {
  /* 
    we build a well formatted job 
    using input provided, but for
    now, just return body.payload
  */

  return body.payload || 'Hello World. :)'
}

const app = express();

// plugin middleware
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use api routes
app.get('/', (req, res) => {
  return res.status(200).json({app_name: 'Job2Twitter'})
});

app.post('/api/webhook', async (req, res, next) => {
  const {body} = req;

  console.log('Well what do we have here', body);

  try {
    const resp = await sherperd.tweet(buildJobPosting(body)); 
  } catch (error) {
    return next(error)
  }

  console.log('Posting was succesful');

  return res.status(200).send(1)

});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(0)
});


app.listen(2019, () => {
  console.log('🍁 running successfully on :2019')
});