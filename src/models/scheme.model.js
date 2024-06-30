const mongoose = require("mongoose")
const Schema = mongoose.Schema;
mongoose.Promise = mongoose.Promise

const scheme = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    company_name:{
        type:String,
    },
    premium_paying_term:{
        type:String,
    },
    area_manager:{
        type: Schema.Types.ObjectId,
        ref: 'managers', // reference to the 'schemes' model
        required: true,
    }
},{ timestamps: true })

const schemes = mongoose.model("schemes",scheme)

module.exports = schemes