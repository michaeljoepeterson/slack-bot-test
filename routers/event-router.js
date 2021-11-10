const express = require('express');
const router = express.Router();
const {checkSecret} = require('../slack/middleware/check-secret');
const { handleChallenge } = require('../slack/middleware/handle-challenge');
const { SlackHelper } = require('../slack/slack-helper');

router.post('/',checkSecret,handleChallenge,async (req,res,next) => {
    console.log(req.body?.event);
    try{
        res.status(200);
        let helper = new SlackHelper(req.body);
        await helper.sendSlackMessage('whats up');
        return res.json({
            message:'test'
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

module.exports = {router};