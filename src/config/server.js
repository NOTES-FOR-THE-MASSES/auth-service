const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
require('../config/database');

// Routes
const authRoutes = require('../routes/auth-router');

const app = express();

// Enable cors
app.use(cors());

// Config body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Log data
app.use(morgan('combined'));

// Setup routes
app.use('/auth', authRoutes);

app.use((err, req, res, next) => {
  console.error(err); //eslint-disable-line 

  res.status(500).send('Something broke!');
  next();
});


module.exports = app;
