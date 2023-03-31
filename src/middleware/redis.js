const redisclient = require('../config/db')
const { exc } = require('../helper/exc')



const checkredis = async(req,res,next)=>{
    const id = req.params.id

    const getdata = await redisclient.get(`post:${id}`)
    if(getdata){
        let data = JSON.parse(getdata)
        res.status(200).json({
            status : 200,
            message : "post you searched (redis)",
            data : exc(data)
        })
    }else{
        next()
    }
}

module.exports = checkredis