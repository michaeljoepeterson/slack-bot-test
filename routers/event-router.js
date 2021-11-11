const express = require('express');
const router = express.Router();
const {checkSecret} = require('../slack/middleware/check-secret');
const { handleChallenge } = require('../slack/middleware/handle-challenge');
const { SlackEventHelper } = require('../slack/slack-event-helper');

router.post('/',checkSecret,handleChallenge,async (req,res,next) => {
    console.log(req.body?.event);
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
        let message = 'Error responding to event';
        console.warn(message,e);
        res.err = e;
        res.errMessage = message;
        next(); 
    }
});

/**
 * router handles events from slack
 */
module.exports = {router};