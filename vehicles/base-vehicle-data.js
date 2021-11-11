/**
 * base vehicle data shared between vehicle input data and vehicle response data
 */
class BaseVehicleData{
    constructor(){
        this.vin = null;
        this.make = null;
        this.model = null;
        this.year = null;
        this.fuelType = null;
    }
}

module.exports = {BaseVehicleData};