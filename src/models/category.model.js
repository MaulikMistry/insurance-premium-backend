const mongoose = require("mongoose")

mongoose.Promise = mongoose.Promise

const Categories = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
    }
},{timestamps:true})

const categorySchema = mongoose.model("vehicle_categorys",Categories)

module.exports = categorySchema