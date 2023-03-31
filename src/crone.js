const cron = require('node-cron')
const User = require('./model/usermodel')
const nodemailer = require('nodemailer')
const secret = require('./config/secrete')


const sendemail = function(email){

    const sender = nodemailer.createTransport(
        {
            host : 'smtp.gmail.com',
            port : 587,
            secure : false,
            auth : {
                user : secret.email,
                pass : secret.password
            }
        }
    )

    const reciever ={
        from : '"thanos" mr.jadhav721@gmail.com',
        to : email,
        subject : 'Kuch naya',
        text : 'You are selected aap Mumbai aa rahe ho Come with Passport size photo and adharcard.....',
    }

    sender.sendMail(reciever,(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log("Mail send succesfully")
        }
    })
}
const searchemail = ()=>{
    try {
        cron.schedule('*/10 * * * * * ',async()=>{
            const emails = await User.find()

            if(emails){
                const useremails = []

                emails.map((k)=>{
                    useremails.push(k.Email)
                })
                
                sendemail(useremails)
            }
        }) 
    } catch (error) {
        console.log(error)
    }
}

module.exports = { searchemail }  
