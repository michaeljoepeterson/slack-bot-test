const axios = require('axios');
const {SLACK_BOT_TOKEN} = require('../config');

/**
 * base helper class for other helper classes to extend
 */
class SlackHelper{
    constructor(body){
        this.body = body;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SLACK_BOT_TOKEN}` 
        };
    }  

    /**
     * send a message to the channel from the slack event
     * @param {*} message 
     */
     async sendSlackMessage(message,channel){
        const url = 'https://slack.com/api/chat.postMessage';
        try{
            let body = {
                text:message,
                channel
            }
            await axios.post(url,body,{headers:this.defaultHeaders});
        }
        catch(e){
            throw e;
        }
    }
}

module.exports = {SlackHelper};