const mongoose = require("mongoose")

mongoose.Promise = mongoose.Promise

const typeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    }
},{ timestamps: true })

const vehicleType = mongoose.model("vehicle_types",typeSchema)

module.exports = vehicleType