const scheme = require("../models/scheme.model");
const logger = require('../logger/CreateLog')

exports.createScheme = (req,res)=>{
    const {name,company_name,premium_paying_term,area_manager} = req.body;
    const newScheme = new scheme({
            name,
            company_name,
            premium_paying_term,
            area_manager     
    })
    return newScheme.save().then((resp)=>
    res.status(201).send({data:resp,message:"Scheme Create successfully"})).catch((err)=> res.status(500).send({err,message:"Server error"}))
}

exports.getScheme = (req,res)=>{
    scheme.find()
    .populate({
        path: 'area_manager',
        select: 'name -_id' // Only select the 'name' property of the 'area_manager'
    }) // populate the 'area_manager' field with the 'name' property
    .then(schemes => {
        return res.status(200).send({
            data: schemes,
            message: "Scheme get successfully"
        });
    })
    .catch(err => {
        logger.log({
            level: 'error',
            message: err.message,
            error: err
        });
        return res.status(500).send({ err: err.message, message: "Server Error" });
    });
}

exports.deleteScheme = (req,res)=>{
    console.log(req)
    const {id}=req.body;
    if(!id){
        return res.status(500).send({message:"Please Provide ID"})
    }
    scheme.deleteOne({_id:id}).then((resp)=>{
        return res.status(200).send({message:"Scheme Delete successfully"})
    }).catch((err)=>{
        return res.status(500).send({err,message:"Server error"})
    })
}

exports.editScheme = (req,res)=>{
    const {id} = req.params;    
    const {name,company_name,premium_paying_term,area_manager} = req.body;  
    
    scheme.updateOne({_id:id},{$set:{name,company_name,premium_paying_term,area_manager}}).then((resp)=>{
        return res.status(200).send({data:resp,message:"Scheme Updated successfully"})
    }).catch((err)=>{
        console.log('err: ', err);
        return res.status(500).send({err,message:"Server Error"})

    })
}

exports.getSchemeById = (req,res)=>{
    const {id} = req.params;  
    scheme.findOne({ _id: id }).then((resp)=>{
        return res.status(200).send({
            data:resp,
            message:"Scheme get successfully"
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
