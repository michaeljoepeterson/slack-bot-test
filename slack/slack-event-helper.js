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

    /**
     * take the resulting error keys and construct a message to inform the user which params they passed were incorrect
     * @param {*} errorKeys 
     * @param {*} vehicleData 
     * @param {*} vehicleResponse 
     * @returns 
     */
    buildVehicleErrorMessage(errorKeys,vehicleData,vehicleResponse){
        let message = 'Looks like some of the options passed are not correct for the vehicle: \n';
        errorKeys.forEach(key => {
            let originalValue = vehicleData[key];
            let apiValue = vehicleResponse[key];
            let errorMessage = `The value you provided: ${originalValue} does not match the value found: ${apiValue}\n`;
            message += errorMessage;
        });

        return message;
    }

    /**
     * build a string for the extra data retrieved from the vehicle api
     * @param {*} vehicleResponse 
     * @returns 
     */
    buildVehicleExtraMessage(vehicleResponse){
        let message = `I found some extra info on your vehicle!\nThe body type is: ${vehicleResponse.vehicleBody} and the manufacturer is: ${vehicleResponse.manufacturer}\n`;
        return message;
    }

    /**
     * verify the vehicle data against the vehicle response from the api
     * @param {*} vehicleResponse 
     * @param {*} vehicleData 
     * @returns the string message to send to the user
     */
    verifyVehicleData(vehicleResponse,vehicleData){
        let incorrectKeys = vehicleResponse.compareVehicleData(vehicleData);
        let message = `I found a result for your vehicle! \n`;
        if(vehicleResponse.hasVinError){
            message += `Looks like there were some issues with your VIN\n`;
        }
        message += `${vehicleResponse.responseMessage}\n`
        let inocrrectMessage = '';
        let extraMessage = this.buildVehicleExtraMessage(vehicleResponse);
        message += extraMessage;

        if(incorrectKeys.length > 0){
            inocrrectMessage = this.buildVehicleErrorMessage(incorrectKeys,vehicleData,vehicleResponse);
        }

        if(!inocrrectMessage){
            message += '\nLooks like all the data you provided matches what I found!'
        }
        else{
            message += inocrrectMessage;
        }


        return message;
    }

    /**
     * handle getting vehicle data and constructing a message based off that data
     * @returns 
     */
    async handleMessageText(){
        let vehicleData = this.getVehicleData();
        if(!vehicleData){
            return 'Hello I can help you verify your vehicle data! Please provide the data in the following format: VIN,Make,Model,Year,Fuel Type.';
        }
        else{
            let vehicleResponse = await vehicleHelper.checkVinData(vehicleData);
            let message = this.verifyVehicleData(vehicleResponse,vehicleData);
            return message;
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