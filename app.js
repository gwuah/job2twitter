const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

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

app.listen(2019, () => {
  console.log('🍁 running successfully on :2019')
})