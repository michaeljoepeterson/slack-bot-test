class VehicleData{
    constructor(){
        this.vin = null;
        this.make = null;
        this.model = null;
        this.year = null;
        this.fuelType = null;
    }

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