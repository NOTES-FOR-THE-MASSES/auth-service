const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('../config/database');

// Routes
const authRoutes = require('../routes/auth-router');

const app = express();

// Enable cors
app.use(cors());

// Config body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setup routes
app.use('/auth', authRoutes);

module.exports = app;
