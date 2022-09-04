const User = require('../models/User')
const { registerValidation, loginValidation } = require('../validations/authValidation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {

    //validate data before proceeding
    const { error } = registerValidation.validate(req.body)
    if (error) return res.status(400).json({ status: false, message: error.details[0].message })

    //check if email exists
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).json({ status: false, message: "Email already exists" });

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    try {
        const save_user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        })
        res.status(200).json({ status: true, message: "User saved successfully", data: save_user })
    } catch (err) {
        res.status(400).json({ status: false.valueOf, message: err })
    }
}

const login = async (req, res) => {
    //validate data before proceeding
    const { error } = loginValidation.validate(req.body)
    if (error) return res.status(400).json({ status: false, message: error.details[0].message })

    //check if email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ status: false, message: "Invalid Login Credentials" });

    //check the password
    const validatePass = await bcrypt.compare(req.body.password, user.password)
    if (!validatePass) return res.status(400).json({ status: false, message: "Invalid Login Credentials" })

    //create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    res.header('bearer-token', token).status(200).json({ status: true, message: "Login was successfull", data: { user, token: token } })
}

module.exports = {
    register,
    login
}