const axios = require('axios');
const {SLACK_BOT_TOKEN} = require('../config');
const {SlackHelper} = require('./slack-helper');

/**
 * class to handle working with slack events
 */
class SlackEventHelper extends SlackHelper{
    constructor(body){
        super(body);
    }   
    
    /**
     * 
     * @returns the event type for the slack event 
     */
    getEventType(){
        return this.body?.event?.type;
    }

    /**
     * 
     * @returns the channel for the slack event
     */
    getEventChannel(){
        return this.body?.event?.channel;
    }

    /**
     * send a message to the channel from the slack event
     * @param {*} message 
     */
    async sendSlackEventMessage(message){
        try{
            let channel = this.getEventChannel();
            await this.sendSlackMessage(message,channel);
        }
        catch(e){
            throw e;
        }
    }
}

module.exports = {SlackEventHelper};