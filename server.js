require('dotenv').config();
const express = require('express');
const { PORT } = require('./config');
const { errorHandler } = require('./middleware/error-handler');
const { cors } = require('./middleware/cors');

const app = express();

app.use(express.json());
app.use(cors);
app.use(cors);

function runServer(port = PORT) {
    return new Promise((resolve, reject) => {
        server = app.listen(port, () => {
          console.log(`Your app is listening on port ${port}`);
          resolve();
        })
        .on('error', err => {
            reject(err);
        });
    });
  }
  
  function closeServer() {
      return new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
    });
  }

  runServer().catch(err => console.error(err));

  module.exports = { app, runServer, closeServer };