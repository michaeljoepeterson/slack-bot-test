const axios = require('axios');
const { VehicleData } = require('../vehicles/vehicle-data');
const { vehicleHelper } = require('../vehicles/vehicle-helper');
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
     * get the message text from the passed body event
     * @returns 
     */
    getMessageText(){
        let {text} = this.body.event;
        //replace bot mention
        text = text.replace(/<.*>/g,'').trim();
        return text;
    }

    /**
     * 
     * @returns the vehicle data for constructing a request to vehicle api 
     */
    getVehicleData(){
        let text = this.getMessageText();
        let splitText = text.split(',');
        if(splitText.length >= 4){
            let vehicleData = new VehicleData();
            vehicleData.initFromArray(splitText);
            return vehicleData;
        }

        return null;
    }

    async handleMessageText(){
        let vehicleData = this.getVehicleData();
        if(!vehicleData){
            return 'Hello I can help you verify your vehicle data! Please provide the data in the following format: VIN,Make,Model,Year,Fuel Type.';
        }
        else{
            let vehicleResponse = await vehicleHelper.checkVinData(vehicleData);
            console.log(vehicleResponse);
            return 'Looks good!';
        }
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