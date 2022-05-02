const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ***********************  Configs ******************************* //
const SERVER_CONFIGS = process.env.PORT || 8080;
const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL;

// ***********************  CORS Policy ******************************* //
app.use(cors({
    origin: FRONTEND_URL,
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "OPTIONS"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const api = require('./api');
app.use('/api', api);

// *********************** Put Testing Routes Here ******************************* //
app.get('/', (req, res) => {
    res.send("Server listening on: " + SERVER_CONFIGS);
})

app.get('/', (req, res) => {
    res.send("Server listening on: " + SERVER_CONFIGS);
})

module.exports = app;