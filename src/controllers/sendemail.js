
const User = require('../model/usermodel')
const Queue = require('bull')
const {redis_port,redis_uri} = require('../config/rediscredentials')

const emailqueue = new Queue('emailQueue',{
    redis :{
        port : redis_port,
        host : redis_uri
    }
})
const sendemailtouser = async (req,res) => {
    try {
        const users = await User.find()

        users.forEach((user,index)=>{
        emailqueue.add({user}).then(()=>{
                if(index + 1 === users.length){
                    res.json({
                        message : "all users are added in queue"
                    })
                }
            })   
            // console.log(user)         
        })

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    sendemailtouser
}