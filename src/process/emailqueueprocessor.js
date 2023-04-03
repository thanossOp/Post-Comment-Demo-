const sendemail = require('../mail/sendmail')


const emailqueueprocessor = async(job, done) => {

    try {
        const email = job.data.user.Email

        await sendemail(email)
        setTimeout(() => {
            done();
        }, 4000);
    } catch (error) {
        console.log(error)
    }

}

module.exports = emailqueueprocessor
