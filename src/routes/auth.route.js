const { signup, login, getUser, updateProfile, signOut, verifyOTP, resetPassword, forgotPassword } = require("../controllers/auth.controller")
const { authenticateToken } = require("../middleware/auth")

const authRouter = require("express").Router()


authRouter.post("/signup", signup)

authRouter.post("/verifyOTP", verifyOTP)

authRouter.post("/login", login)

authRouter.post("/reset-password", authenticateToken, resetPassword)

authRouter.post("/forgot-password",forgotPassword)

authRouter.post("/updateProfile", authenticateToken, updateProfile)

authRouter.post("/signout",authenticateToken,signOut)

module.exports = authRouter