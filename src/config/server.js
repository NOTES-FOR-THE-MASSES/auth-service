const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('../utils/error-handler');
const authRoutes = require('../routes/auth-router');

require('../config/database');

const app = express();

// Enable cors
app.use(cors());

// Config body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Log requests
app.use(morgan('combined'));

// Setup routes
app.use('/auth', authRoutes);

// Handle handling
app.use(errorHandler.handleError);

module.exports = app;
