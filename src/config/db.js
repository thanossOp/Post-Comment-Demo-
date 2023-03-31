const mongoose = require('mongoose')

const redis = require('redis')

const redisclient = redis.createClient()

const db = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.PASSWORD
);

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("database connected")
}).catch((err) => {
    console.log(err)
})

redisclient.connect()

redisclient.on("connect",()=>{
    console.log("redis connected")
})

module.exports = redisclient