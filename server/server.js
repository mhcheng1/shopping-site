require('dotenv').config();
const SERVER_CONFIGS = process.env.PORT || 8080

const app = require('./app').func()

app.listen(SERVER_CONFIGS, error => {
  if (error) throw error;
  console.log('Server running on port: ' + SERVER_CONFIGS);
});