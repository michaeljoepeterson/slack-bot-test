require('dotenv').config();
const express = require('express');
const { PORT,SLACK_BOT_TOKEN,SIGN_SECRET } = require('./config');
const { errorHandler } = require('./middleware/error-handler');
const { cors } = require('./middleware/cors');
const {App} = require('@slack/bolt');

const slackApp = new App({
  signingSecret: SIGN_SECRET,
  token: SLACK_BOT_TOKEN,
})

const app = express();

app.use(express.json());
app.use(cors);
app.use(cors);

async function runServer() {
  /*
  server = app.listen(port, () => {
    console.log(`Your app is listening on port ${port}`);
  });
  */
  try{
    await slackApp.start(PORT);
    console.log('app slack');
  }
  catch(e){
    console.log(e);
  }
} 

runServer();

module.exports = { app, runServer };