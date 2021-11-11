const { BaseVehicleData } = require("./base-vehicle-data");

/**
 * vehicle data created from vehicle input data
 */
class VehicleData extends BaseVehicleData{
    constructor(){
        super();
    }

    /**
     * init data from split data array from slack
     * @param {*} params 
     */
    initFromArray(params){
        let [vin,make,model,year,fuelType] = params;
        this.vin = vin;
        this.make = make;
        this.model = model;
        this.year = year;
        this.fuelType = fuelType;
    }
}

module.exports = {VehicleData};