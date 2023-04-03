const User = require('../model/usermodel')

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const loginUser = async (req, res) => {
    try {
        const email = req.body.Email
        const password = req.body.password

        const useremail = await User.findOne({ Email: email })

        const isMatch = await bcrypt.compare(password, useremail.password)


        if (isMatch) {
            const payload = {
                Email: email, password: password, role: useremail.role
            }
            const token = jwt.sign(payload, process.env.SECRET_KEY,{expiresIn : 10000000})

            res.status(200).json({
                status: 200,
                token: token
            })
        } else {
            res.status(400).json({
                status : 400,
                messages : "invalid Login details"
            })
        }


    } catch (e) {
        res.status(400).json({
            status : 400,
            messages : "invalid Login details"
        })
    }
}



module.exports = { loginUser }