const axios = require('axios');

/**
 * class to contain methods for working with the vehicle api
 */
class VehicleHelper{
    constructor(){
        this.baseVinUrl = 'https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/';
    }

    async checkVinData(vehicleData){
        let {vin,make,model,year,fuelType} = vehicleData;
        let url = `${this.baseVinUrl}/${vin}?format=json&modelyear=${year}`;
        try{
            let response = await axios.get(url);
            return response.data?.Results;
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