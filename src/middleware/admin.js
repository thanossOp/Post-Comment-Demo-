const User = require('../model/usermodel')

function admin(req,res,next){

    console.log(req.user)
    if (!(req.user.role == "admin")) {
       return res.json({
        status:401,
        messages : "You are not authorized"
       })
    }
    else{
        return next()
    }
    
}

module.exports = admin