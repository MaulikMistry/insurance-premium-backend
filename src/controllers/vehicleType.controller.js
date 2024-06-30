const vehicleType = require("../models/type.model");
const logger = require('../logger/CreateLog')

exports.createType = (req,res)=>{
    const {name} = req.body;
    const newType = new vehicleType({name})
    return newType.save().then((resp)=>
    res.status(201).send({data:resp,message:"Policy Type Create Successfull"})).catch((err)=> res.status(500).send({err,message:"Server error"}))
}

exports.getType = (req,res)=>{
    console.log("in come")
    vehicleType.find().then((resp)=>{
        return res.status(200).send({
            data:resp,
            message:"Policy Get successfull"
        })
    }).catch((err)=>{
        logger.log({
            level: 'error',
            message: err.message,
            error:err
        })
        return res.status(500).send({
            err:err.message,
            message:"Server Error"
        })
    })
}

exports.deleteType = (req,res)=>{
    const {id}=req.body;
    vehicleType.deleteOne({_id:id}).then((resp)=>{
        return res.status(200).send({message:"Type Delete successfull"})
    }).catch((err)=>{
        console.log('err: ', err);
        return res.status(500).send({err,message:"Server error"})

    })
}

exports.editType = (req,res)=>{
    const {id} = req.query;    
    const {name} = req.body;    
    
    vehicleType.updateOne({_id:id},{$set:{name}}).then((resp)=>{
        return res.status(200).send({data:resp,message:"Type Edited Successfull"})
    }).catch((err)=>{
        console.log('err: ', err);
        return res.status(500).send({err,message:"Server Error"})

    })
}