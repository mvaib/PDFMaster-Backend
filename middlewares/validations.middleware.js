const validator = require("validator")

const registerValidation = (req, res, next) => {
    const {name,email, password} = req.body
    if( !name ||!email || !password) return res.status(400).json({success : false, msg : "All fields are required"})
    if(!validator.isEmail(email)) return res.status(400).json({success : false, msg : "Invalid email"})
    if(password.length < 8) return res.status(400).json({success : false, msg : "Password must be at least 8 characters"})
    if(!validator.isStrongPassword(password)) return res.status(400).json({success : false, msg : "Please enter a strong password"})
    next()
}

const loginValidation = (req, res, next) => {
    const {email, password} = req.body
    if(!email || !password) return res.status(400).json({success : false, msg : "All fields are required"})
    next()
}

module.exports = {registerValidation, loginValidation}