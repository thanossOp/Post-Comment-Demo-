const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { string } = require('joi')

const userschema = new mongoose.Schema({

    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true, 
        enum:['user','admin'],
        default: 'user'
    },
    phonenumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    confirm_password: {
        type: String,
        required: true
    }
},
    {
        versionKey: false
    })

userschema.pre("save", async function (next) {

    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
        this.confirm_password = undefined;
    }
    next()
})

const User =  mongoose.model("users", userschema)

module.exports = User