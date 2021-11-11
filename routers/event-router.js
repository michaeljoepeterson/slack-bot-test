const express = require('express');
const router = express.Router();
const {checkSecret} = require('../slack/middleware/check-secret');
const { handleChallenge } = require('../slack/middleware/handle-challenge');
const { SlackEventHelper } = require('../slack/slack-event-helper');

/**
 * handle events sent by slack 
 */
router.post('/',checkSecret,handleChallenge,async (req,res,next) => {
    try{
        res.status(200);
        let helper = new SlackEventHelper(req.body);
        let message = await helper.handleMessageText();
        await helper.sendSlackEventMessage(message);
        return res.json({
            message
        });
    }
    catch(e){
        let message = 'Looks like an error occured please try again.';
        console.warn(message,e);
        res.err = e;
        res.errMessage = message;
        await helper.sendSlackEventMessage(message);
        next(); 
    }
});

/**
 * router handles events from slack
 */
module.exports = {router};