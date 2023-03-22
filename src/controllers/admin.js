const User = require('../model/usermodel')


const getalluser = async (req, res) => {
    try {
        const users = await User.find()

        res.send(users)
    } catch (error) {
        res.status(401).json({
            status : 401,
            message : "You are not authorized"
        }).send(error)
    }
}


async function updaterole(req,res,next){

    try {
       const id = req.params.id
       const updaterole = await User.findByIdAndUpdate(id,{$set :{role : 'admin'}},{
        new : true
       })
       res.status(200).json({
        status:200,
        message : "Congratulations You are now an Admin ....",
        data : updaterole
       })
       next()

    } catch (error) {
        res.status(401).json({
            status : 401,
            message : "You are not authorized" 
        })
    }

}

module.exports = {getalluser,updaterole}