//validation
const Joi = require('@hapi/joi')

const registerValidation = Joi.object({
    name: Joi.string().max(255).required(),
    email: Joi.string().email().max(255).required(),
    password: Joi.string().min(6).required()
})

const loginValidation = Joi.object({
    email: Joi.string().email().max(255).required(),
    password: Joi.string().min(6).required()
})

module.exports = {
    registerValidation,
    loginValidation
}