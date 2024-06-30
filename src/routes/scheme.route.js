const { createScheme, getScheme, deleteScheme, editScheme, getSchemeById } = require("../controllers/scheme.controller")
const { authenticateSuperAdmin } = require("../middleware/auth")

const schemeRoute = require("express").Router()

schemeRoute.get("/",authenticateSuperAdmin,getScheme)

schemeRoute.post("/",authenticateSuperAdmin,createScheme)

schemeRoute.delete("/",authenticateSuperAdmin,deleteScheme)

schemeRoute.put("/:id",authenticateSuperAdmin,editScheme)

schemeRoute.get("/:id",authenticateSuperAdmin,getSchemeById)

module.exports = schemeRoute