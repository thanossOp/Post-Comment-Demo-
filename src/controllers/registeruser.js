const User = require('../model/usermodel')


const createUser = async (req, res) => {
    try {
        const password = req.body.password
        const newuser = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            Email: req.body.Email,
            role : req.body.role,   
            phonenumber: req.body.phonenumber,
            password: password,
            confirm_password: req.body.confirm_password
        })

        const createduser = await newuser.save()
        res.status(201).json({
            status:201,
            message : "Created successfully",
            data : createduser
           })

    } catch (e) {
        res.status(400).json({
            status : 400,
            messages : "bad request"
        })
    }

}

module.exports = { createUser }