const { createPolicy, getPolicy, deletePolicy, editPolicy, getPolicyById,getPolicyByClientId } = require("../controllers/policy.controller")
const { authenticateSuperAdmin } = require("../middleware/auth")

const policyRoute = require("express").Router()

policyRoute.get("/",authenticateSuperAdmin,getPolicy)

policyRoute.post("/",authenticateSuperAdmin,createPolicy)

policyRoute.delete("/",authenticateSuperAdmin,deletePolicy)

policyRoute.put("/:id",authenticateSuperAdmin,editPolicy)

policyRoute.get("/:id",authenticateSuperAdmin,getPolicyById)

policyRoute.get("/client",authenticateSuperAdmin,getPolicyByClientId)

module.exports = policyRoute