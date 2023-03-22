const mongoose = require('mongoose')

const db = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.PASSWORD
);

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connected")
}).catch((err) => {
    console.log(err)
})