const express = require("express")
const { registerUser, loginUser } = require("../controllers/users.controller")
const { registerValidation, loginValidation } = require("../middlewares/validations.middleware")
const userRouter = express.Router()

userRouter.post("/register",  registerValidation, registerUser)
userRouter.post("/login", loginValidation,loginUser)


module.exports = {userRouter}