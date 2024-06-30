const premium = require("../models/premium.model");
const logger = require('../logger/CreateLog')

exports.createPremium = (req,res)=>{
    const {client_id,policy_id,sum_assured,total_premium,gst_tax,cheque_amount,
        cheque_date,bank_name,bank_branch,premium_mode,premium_paying_term,code_no,
        premium_date,premium_paying_date} = req.body;
    const newPremium = new premium({
        client_id,
        policy_id,
        sum_assured,
        total_premium,
        gst_tax,
        cheque_amount,
        cheque_date,
        bank_name,
        bank_branch,
        premium_mode,
        premium_paying_term,
        code_no,
        premium_date,
        premium_paying_date,     
    })
    return newPremium.save().then((resp)=>
    res.status(201).send({data:resp,message:"Premium Create successfully"})).catch((err)=> res.status(500).send({err,message:"Server error"}))
}

exports.getPremium = (req,res)=>{
    premium.find()
    .populate({
        path: 'client_id',
        select: 'name -_id' // Only select the 'name' property of the 'area_manager'
    })
    .populate({
        path: 'policy_id',
        select: 'scheme_id -_id',
        populate: {
            path: 'scheme_id',
            select: 'name -_id' // Only select the 'name' property of the 'scheme_id'
        }
    })
    .then((resp)=>{
        return res.status(200).send({
            data:resp,
            message:"Premium get successfully"
        })
    }).catch((err)=>{
        logger.log({
            level: 'error',
            message: err.message,
            error:err
          });

        return res.status(500).send({err:err.message,message:"Server Error"})

    })
}

exports.deletePremium = (req,res)=>{
    const {id}=req.body;
    if(!id){
        return res.status(500).send({message:"Please Provide ID"})
    }
    premium.deleteOne({_id:id}).then((resp)=>{
        return res.status(200).send({message:"Premium Delete successfully"})
    }).catch((err)=>{
        return res.status(500).send({err,message:"Server error"})
    })
}

exports.editPremium = (req,res)=>{
    const { id } = req.params; 
    const {client_id,policy_id,sum_assured,total_premium,gst_tax,cheque_amount,
        cheque_date,bank_name,bank_branch,premium_mode,premium_paying_term,code_no,
        premium_date,premium_paying_date} = req.body;  
    
    premium.updateOne({_id:id},{$set:{client_id,policy_id,sum_assured,total_premium,
                                        gst_tax,cheque_amount,cheque_date,bank_name,
                                        bank_branch,premium_mode,premium_paying_term,code_no
                                        ,premium_date,premium_paying_date}}).then((resp)=>{
        return res.status(200).send({data:resp,message:"Premium Updated successfully"})
    }).catch((err)=>{
        console.log('err: ', err);
        return res.status(500).send({err,message:"Server Error"})

    })
}

exports.getPremiumById = (req,res)=>{
    const { id } = req.params;
    premium.findOne({ _id: id }).then((resp)=>{
        return res.status(200).send({
            data:resp,
            message:"Premium get successfully"
        })
    }).catch((err)=>{
        logger.log({
            level: 'error',
            message: err.message,
            error:err
          });

        return res.status(500).send({err:err.message,message:"Server Error"})

    })
}
