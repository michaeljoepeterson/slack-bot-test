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

    checkValue(){

    }
}

module.exports = {VehicleResponse};