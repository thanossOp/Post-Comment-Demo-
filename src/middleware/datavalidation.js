const errorMessage = require('../helper/error')
// console.log(errorMessage);

function datavalidation(schema) {
    return function (req, res, next) {

        let body = req.body

        const options = {
            abortEarly: false,
            messages: errorMessage
        }

        const result = schema.validate(body, options)

        if (result.error) {

            const errors = result.error.details.map(d => {
                const message = d.message
                return message
            })
            return res.status(406).json({
                status: 406,
                message: "Invalid parameter",
                data: errors
            })

        } else {
            next()
        }
    }
}

module.exports = datavalidation