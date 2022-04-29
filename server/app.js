const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express()

// ***********************  Configs ******************************* //
const SERVER_CONFIGS = process.env.PORT || 8080

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