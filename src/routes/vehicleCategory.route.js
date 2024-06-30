const express = require("express")
const { getCategory, createCategory, editCategory, deleteCategory } = require("../controllers/vehiclecategory.controller")
const { authenticateSuperAdmin } = require("../middleware/auth")

const vehicleCategoryRoute = express.Router()

vehicleCategoryRoute.get("/",getCategory)

vehicleCategoryRoute.post("/",authenticateSuperAdmin,createCategory)

vehicleCategoryRoute.put("/",authenticateSuperAdmin,editCategory)

vehicleCategoryRoute.delete("/",authenticateSuperAdmin,deleteCategory)

module.exports = vehicleCategoryRoute