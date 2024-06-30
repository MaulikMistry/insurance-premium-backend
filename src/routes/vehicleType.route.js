const { createType, getType, deleteType, editType } = require("../controllers/vehicleType.controller")
const { authenticateSuperAdmin } = require("../middleware/auth")

const vehicleTypeRoute = require("express").Router()

vehicleTypeRoute.get("/",getType)

vehicleTypeRoute.post("/",authenticateSuperAdmin,createType)

vehicleTypeRoute.delete("/",authenticateSuperAdmin,deleteType)

vehicleTypeRoute.put("/",authenticateSuperAdmin,editType)

module.exports = vehicleTypeRoute