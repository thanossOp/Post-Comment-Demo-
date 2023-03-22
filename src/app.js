const express = require("express")

const dotenv = require("dotenv").config()
const jwtStrategy= require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt
const passport = require("passport")
require('./config/db')

const userrouter = require('./routes/user')

const postrouter = require('./routes/post')

const commentrouter = require('./routes/comment')

const adminrouter = require('./routes/adminroutes')

const User = require("./model/usermodel")

const app = express()

const port = process.env.PORT || 3000




app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', userrouter)
app.use('/', postrouter)
app.use('/', commentrouter)
app.use('/', adminrouter)


const opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey :  process.env.SECRET_KEY
}

 passport.use(new jwtStrategy(opts , async function(payload,done){
    try {
        const user = await User.findOne({
            Email : payload.Email
        })    
      
        if(user){
            return done(null,user)
        }else{
            return done(null,false)
        }
    } catch (error) {
        return done(err,false)
    }
}))







app.listen(port, () => {
    console.log(`${port}`)
})

module.exports = app