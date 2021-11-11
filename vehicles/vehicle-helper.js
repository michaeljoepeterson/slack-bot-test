const axios = require('axios');
const { VehicleResponse } = require('./vehicle-response');

/**
 * class to contain methods for working with the vehicle api
 */
class VehicleHelper{
    constructor(){
        this.baseVinUrl = 'https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/';
        this.errorId = 143;
        this.responseTextId = 191;
        this.manufacturerId = 27;
        this.vehicleBodyId = 5;
        this.modelId = 28;
        this.makeId = 26;
        this.fuelTypeId = 24;
        this.yearId = 29;
    }

    /**
     * get the response value from the data returned from the api
     * @param {*} id 
     * @param {*} data 
     * @returns the value for the found response data
     */
    getResponseFromData(id,data){
        let responseData = this.findData(id,data);
        return responseData?.Value;
    }

    /**
     * helper to find a value from the data based off the value id
     * @param {*} id 
     * @param {*} data 
     * @returns 
     */
    findData(id,data){
        return data.find(val => val.VariableId === id);
    }

    /**
     * check if the request had any vin decoding errors
     * @param {*} data 
     * @returns true if there is a vin error false if there are no vin errors
     */
    checkErrors(data){
        let errorCodes = this.findData(this.errorId,data);
        let splitCodes = errorCodes.Value?.split(',');
        if(splitCodes?.length === 1){
            return false;
        }
        else{
            return true;
        }
    }

    /**
     * parse through passed data to get all data params
     * @param {*} data 
     */
    findAllVehicleData(data){
        const responseMessage = this.getResponseFromData(this.responseTextId,data);
        const manufacturer = this.getResponseFromData(this.manufacturerId,data); 
        const vehicleBody = this.getResponseFromData(this.vehicleBodyId,data); 
        const model = this.getResponseFromData(this.modelId,data); 
        const make = this.getResponseFromData(this.makeId,data);
        const fuelType = this.getResponseFromData(this.fuelTypeId,data);
        const year = this.getResponseFromData(this.yearId,data);
        const hasVinError = this.checkErrors(data);
        let response = new VehicleResponse();
        response.init({
            make,
            model,
            vehicleBody,
            manufacturer,
            fuelType,
            year,
            responseMessage,
            hasVinError
        });

        return response;
    }

    async checkVinData(vehicleData){
        let {vin,year} = vehicleData;
        let url = `${this.baseVinUrl}/${vin}?format=json&modelyear=${year}`;
        try{
            let response = await axios.get(url);
            let vehicleResponse = this.findAllVehicleData(response.data?.Results);
            return vehicleResponse;
        }
        catch(e){
            throw e;
        }
    }
}

/**
 * export instance to utilize cache
 */
const vehicleHelper = new VehicleHelper();

module.exports = {vehicleHelper};