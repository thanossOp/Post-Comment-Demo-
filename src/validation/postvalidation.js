const joi = require('joi')

const validate_post = joi.object({
    post_name: joi.string()
        .max(15)
        .required(),
    caption: joi.string()
        .max(200)

})

module.exports = validate_post