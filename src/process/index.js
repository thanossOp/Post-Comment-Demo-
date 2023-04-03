const Queue = require('bull')
const {redis_port,redis_uri} = require('../config/rediscredentials')
const path = require('path')

const emailqueue = new Queue('emailQueue',{
    redis :{
        port : redis_port,
        host : redis_uri
    }
})

const redispath = path.join(__dirname,"emailqueueprocessor.js");
// console.log(redispath)
emailqueue.process(redispath)

emailqueue.on('completed',(job)=>{
    console.log(`email sended to ${job.data.user.first_name}`)
})

