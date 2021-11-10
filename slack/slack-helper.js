const axios = require('axios');
const {SLACK_BOT_TOKEN} = require('../config');

class SlackHelper{
    constructor(body){
        this.body = body;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SLACK_BOT_TOKEN}` 
        };
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
    async sendSlackMessage(message){
        const url = 'https://slack.com/api/chat.postMessage';
        try{
            let body = {
                text:message,
                channel:this.getEventChannel()
            }
            await axios.post(url,body,{headers:this.defaultHeaders});
        }
        catch(e){
            throw e;
        }
    }
}

module.exports = {SlackHelper};