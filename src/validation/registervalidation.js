const joi = require('joi')

const validate_user = joi.object({
    first_name: joi.string()
        .min(2)
        .max(10)
        .required(),
    last_name: joi.string()
        .min(2)
        .max(10)
        .required(),
    Email: joi.string()
        .required()
        .pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    role: joi.string(),
    phonenumber: joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),
    password: joi.string()
        .min(6)
        .max(15)
        .pattern(/^[\w_]*$/)
        .required(),
    confirm_password: joi.string()
        .valid(joi.ref('password')).required().messages({ 'any.only': '{{#label}} does not match' })
})

module.exports = validate_user