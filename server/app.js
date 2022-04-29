const cors = require('cors');
require('dotenv').config();
const express = require('express');
const app = express()


// ***********************  Configs ******************************* //
const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL
const SERVER_CONFIGS = process.env.PORT || 8080
const REDIS_PORT = process.env.REDIS_PORT || 6379;

// Start of the app content
// ***********************  CORS Policy ******************************* //
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const api = require('./api');
app.use('/api', api);


// *********************** Put Testing Routes Here ******************************* //
app.get('/', (req, res) => {
    res.send("Server listening on: " + SERVER_CONFIGS)
})

module.exports = app;