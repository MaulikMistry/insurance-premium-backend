const mongoose = require("mongoose")
var Schema = mongoose.Schema;
mongoose.Promise = mongoose.Promise

const policyModel = new mongoose.Schema({
    scheme_id:{
        type: Schema.Types.ObjectId,
        ref: 'schemes', // reference to the 'schemes' model
        required: true,
    },
    client_id:{
        type: Schema.Types.ObjectId,
        ref: 'Clients', // reference to the 'schemes' model
        required: true,
    },
    type_of_policy:{
        type: Schema.Types.ObjectId,
        ref: 'vehicle_types', // reference to the 'schemes' model
        required: true,
    },
    regional_head_id:{
        type: Schema.Types.ObjectId,
        ref: 'managers', // reference to the 'schemes' model
        required: true,
    },
    area_manager_id:{
        type: Schema.Types.ObjectId,
        ref: 'managers', // reference to the 'schemes' model
        required: true,
    },
    representative_name:{
        type:String,
    },
    login_date:{
        type:String,
        required:true,
    },
    expiry_date:{
        type:String,
        required:true,
    },
    expiry_month:{
        type:String,
    },
    main_category:{
        type: Schema.Types.ObjectId,
        ref: 'vehicle_categorys', // reference to the 'schemes' model
        required: true,       
    },
    sub_category:{
        type: Schema.Types.ObjectId,
        ref: 'vehicle_categorys', // reference to the 'schemes' model
        required: true,
    },
    branch_location:{
        type:String,
    },
    channel:{
        type:String,
    },
    employee_code:{
        type:String,
    },
    vehicle_no:{
        type:String,
    }
},{ timestamps: true })

const policy = mongoose.model("policy",policyModel, "policy")

module.exports = policy