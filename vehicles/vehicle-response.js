const { BaseVehicleData } = require("./base-vehicle-data");

/**
 * class to represent the data for a vehicle response after parsing the response from a vehicle api response
 */
class VehicleResponse extends BaseVehicleData{
    constructor(){
        super();
        this.vehicleBody = null;
        this.manufacturer = null;
        this.responseMessage = null;
        this.hasVinError = null;
    }

    /**
     * init data from passed object
     * @param {*} data 
     */
    init(data){
        let possibleKeys = Object.keys(this);
        let keyLookup = {};
        possibleKeys.forEach(key => keyLookup[key] = key);
        let dataKeys = Object.keys(data);
        for(let key of dataKeys){
            if(keyLookup[key]){
                this[key] = data[key];
            }
        }
    }

    /**
     * compare the original passed vehicle data with the current vehicle response
     * @param {*} vehicleData 
     * @returns 
     */
    compareVehicleData(vehicleData){
        let dataKeys = Object.keys(vehicleData);
        let errorKeys = [];
        for(let key of dataKeys){
            if(key === 'vin'){
                continue;
            }
            if(vehicleData[key]?.trim()?.toLowerCase() != this[key]?.trim()?.toLowerCase()){
                errorKeys.push(key);
            }
        } 
        return errorKeys;
    }
}

module.exports = {VehicleResponse};