const categorySchema = require("../models/category.model")
const logger = require('../logger/CreateLog')

exports.getCategory = (req,res)=>{
    categorySchema.find().then((resp)=>{
        return res.status(200).send({
            data:resp,
            message:"Vehicle Category Get successfull"
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

exports.createCategory = (req,res)=>{
    const {name} = req.body

    const newCategory =new categorySchema({
        name
    })
    newCategory.save().then((resp)=>{
        return res.status(201).send({
            data:resp,
            message:"New Category Created"
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

exports.editCategory = (req,res)=>{
    const {id} = req.query;
    const {name} = req.body

    categorySchema.updateOne({_id:id},{$set:{name}}).then((resp)=>{
        return res.status(200).send({
            data:resp,
            message:"Category edited"
        })
    }).catch((err)=>{
        logger.log({
            level:"error",
            message: err.message,
            error:err
        })
        return res.status(500).send({
            err:err.message,
            message:"Server Error"
        })
    })
}

exports.deleteCategory = (req,res)=>{
    const {id} = req.body;

    categorySchema.deleteOne({_id:id}).then((resp)=>{
        return res.status(200).send({data:resp,message:"Cateory deleted successfull"})
    }).catch((err)=>{
        logger.log({
            level:"error",
            error:err,
            message:err.message
        })
        return res.status(500).send({err:err.message,message:"Server Error"})
    })
}