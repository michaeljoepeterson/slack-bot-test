require('dotenv').config();
const express = require('express');
const { PORT,SLACK_BOT_TOKEN,SIGN_SECRET } = require('./config');
//const { errorHandler } = require('./middleware/error-handler');
//const { cors } = require('./middleware/cors');
const {App} = require('@slack/bolt');

const slackApp = new App({
  signingSecret: SIGN_SECRET,
  token: SLACK_BOT_TOKEN,
})
//const app = express();
/*

app.use(express.json());
app.use(cors);
app.use(cors);
*/
async function runServer() {
  /*
  app.listen(PORT, () => {
    console.log(`Your app is listening on port ${PORT}`);
  });
  */
 
  try{
    await slackApp.start(PORT);
    console.log(slackApp);
    console.log('app slack',PORT);
  }
  catch(e){
    console.log(e);
  }
  
} 

runServer();

module.exports = { runServer };