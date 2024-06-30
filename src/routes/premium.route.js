const { createPremium, getPremium, deletePremium, editPremium, getPremiumById } = require("../controllers/premium.controller")
const { authenticateSuperAdmin } = require("../middleware/auth")

const premiumRoute = require("express").Router()

premiumRoute.get("/",authenticateSuperAdmin,getPremium)

premiumRoute.post("/",authenticateSuperAdmin,createPremium)

premiumRoute.delete("/",authenticateSuperAdmin,deletePremium)

premiumRoute.put("/:id",authenticateSuperAdmin,editPremium)

premiumRoute.get("/:id",authenticateSuperAdmin,getPremiumById)

module.exports = premiumRoute