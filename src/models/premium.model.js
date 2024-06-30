const mongoose = require("mongoose")
var Schema = mongoose.Schema;
mongoose.Promise = mongoose.Promise

const premium = new mongoose.Schema({
    client_id:{
        type: Schema.Types.ObjectId,
        ref: 'Clients', // reference to the 'schemes' model
        required: true,
    },
    policy_id:{
        type: Schema.Types.ObjectId,
        ref: 'policy', // reference to the 'schemes' model
        required: true,
    },
    sum_assured:{
        type:Number,
    },
    total_premium:{
        type:Number,
    },
    gst_tax:{
        type:Number,
    },
    cheque_amount:{
        type:Number,
    },
    cheque_date:{
        type:String,
    },
    bank_name:{
        type:String,
    },
    bank_branch:{
        type:String,
    },
    premium_mode:{
        type:String,
    },
    premium_paying_term:{
        type:String,
    },
    code_no:{
        type:String,
    },
    premium_date:{
        type:String,
    },
    premium_paying_date:{
        type:String,
    }

},{ timestamps: true })

const premiumns = mongoose.model("premiums",premium)

module.exports = premiumns