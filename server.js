require('dotenv').config();
const express = require('express');
const { PORT,SLACK_BOT_TOKEN,SIGN_SECRET } = require('./config');
const { errorHandler } = require('./middleware/error-handler');
const { cors } = require('./middleware/cors');

const app = express();
app.use(express.json());
app.use(cors);
app.use(cors);

async function runServer() {
  try{
    app.listen(PORT); 
  }
  catch(e){
    console.log(e);
  }
} 

runServer();