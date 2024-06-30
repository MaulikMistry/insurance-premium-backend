const Policy = require("../models/policy.model");
const logger = require('../logger/CreateLog')

exports.createPolicy = (req,res)=>{
    try{
    const {scheme_id,client_id,type_of_policy,regional_head_id,area_manager_id,
        representative_name,login_date,expiry_date,expiry_month,main_category,
        sub_category,branch_location,channel,employee_code,vehicle_no} = req.body;
    const newPolicy = new Policy({
        scheme_id,
        client_id,
        type_of_policy,
        regional_head_id,
        area_manager_id,
        representative_name,
        login_date,
        expiry_date,
        expiry_month,
        main_category,
        sub_category,
        branch_location,
        channel,
        employee_code,
        vehicle_no
    })
    return newPolicy.save().then((resp)=>
    res.status(201).send({data:resp,message:"Policy Create successfully"})).catch((err)=> res.status(500).send({err,message:"Server error"}))
    }catch(e){
        console.log("er",e);
    }
}

exports.getPolicy = (req,res)=>{
    Policy.find()
    .populate({
        path: 'scheme_id',
        select: 'name -_id' // Only select the 'name' property of the 'area_manager'
    })
    .populate({
        path: 'client_id',
        select: 'name -_id'
    })
    .populate({
        path: 'type_of_policy',
        select: 'name -_id'
    })
    .populate({
        path: 'regional_head_id',
        select: 'name -_id'
    })
    .populate({
        path: 'area_manager_id',
        select: 'name -_id'
    })
    .populate({
        path: 'main_category',
        select: 'name -_id'
    })
    .populate({
        path: 'sub_category',
        select: 'name -_id'
    })
    .then((resp)=>{
        return res.status(200).send({
            data:resp,
            message:"Policy get successfully"
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

exports.deletePolicy = (req,res)=>{
    const {id}=req.body;
    if(!id){
        return res.status(500).send({message:"Please Provide ID"})
    }
    Policy.deleteOne({_id:id}).then((resp)=>{
        return res.status(200).send({message:"Policy Delete successfully"})
    }).catch((err)=>{
        return res.status(500).send({err,message:"Server error"})
    })
}

exports.editPolicy = (req,res)=>{
    const { id } = req.params;
    const {scheme_id,client_id,type_of_policy,regional_head_id,area_manager_id,representative_name,login_date,expiry_date,expiry_month,main_category,sub_category,branch_location,channel,employee_code,vehicle_no} = req.body;  
    
    Policy.updateOne({_id:id},{$set:{scheme_id,client_id,type_of_policy,regional_head_id,area_manager_id,representative_name,login_date,expiry_date,expiry_month,main_category,sub_category,branch_location,channel,employee_code,vehicle_no}}).then((resp)=>{
        return res.status(200).send({data:resp,message:"Policy Updated successfully"})
    }).catch((err)=>{
        console.log('err: ', err);
        return res.status(500).send({err,message:"Server Error"})

    })
}

exports.getPolicyById = (req,res)=>{
    const { id } = req.params;
    Policy.findOne({ _id: id }).then((resp)=>{
        return res.status(200).send({
            data:resp,
            message:"Policy get successfully"
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


exports.getPolicyByClientId = (req,res)=>{
    const { client_id } = req.params;
    Policy.find({ client_id: client_id }).then((resp)=>{
        return res.status(200).send({
            data:resp,
            message:"Policy get successfully"
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
