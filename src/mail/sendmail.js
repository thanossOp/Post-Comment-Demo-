const secret = require('../config/secrete')
const nodemailer = require('nodemailer')

const sendemail = function (email) {

    const sender = nodemailer.createTransport(
        {
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: secret.email,
                pass: secret.password
            }
        }
    )

    const reciever = {
        from: '"thanos" mr.jadhav721@gmail.com',
        to: email,
        subject: 'Kuch naya',
        text: 'You are selected aap Mumbai aa rahe ho Come with Passport size photo and adharcard.....',
    }

    sender.sendMail(reciever, (err) => {
        if (err) {
            console.log(err)
        } 
    })
}

module.exports = sendemail