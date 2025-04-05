const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
require("dotenv").config()
const { UserModel } = require('../models/users.model')

const registerUser = async (req, res) => {
    const { name, password, email} = req.body
    try {
        const user = await UserModel.findOne({email})
        if(user) return res.status(400).json({success : false, msg : "User already exists"})

        const salt = await bcrypt.genSalt(+process.env.SALT_ROUNDS)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new UserModel({
            name,
            email,
            password : hashedPassword
        })

        await newUser.save()
        res.status(200).json({success : true, msg : "User registered successfully!"})
    } catch (error) {
        console.error(error)
        res.status(400).json({success : false, msg : "Error"})
    }
}

const loginUser = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await UserModel.findOne({email})
        if(!user) return res.status(400).json({success : false, msg : "User not found"}) 
        
        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword) return res.status(400).json({success : false, msg : "Invalid Password"})

        const token = jwt.sign({userId : user._id, name : user.name}, process.env.SECRET_KEY, {expiresIn : "3d"})

        res.status(200).json({succes : true, msg : "Login successful!", token : token})
    } catch (error) {
        console.error(error)
        res.status(400).json({success : false, msg : "Error"})
    }
}
module.exports = {registerUser, loginUser}