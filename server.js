require('dotenv').config();
const express = require('express');
const { PORT,SLACK_BOT_TOKEN,SIGN_SECRET } = require('./config');
//const { errorHandler } = require('./middleware/error-handler');
//const { cors } = require('./middleware/cors');
const {App} = require('@slack/bolt');

/*
const slackApp = new App({
  signingSecret: SIGN_SECRET,
  token: SLACK_BOT_TOKEN,
})
*/
//const app = express();
/*

app.use(express.json());
app.use(cors);
app.use(cors);
*/
/*
async function runServer() {
  try{
    await slackApp.start(PORT);
    console.log(app);
    console.log('app slack',PORT);
  }
  catch(e){
    console.log(e);
  }
  
} 
*/
//runServer();

const app = new App({
  signingSecret: process.env.SIGN_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

/* Add functionality here */

(async () => {
  // Start the app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();

//module.exports = { runServer };