const { date } = require('joi');
const mongoose = require('mongoose')

const postschema = new mongoose.Schema({

    post_name: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    author :{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'users'
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'users',
        default : null
    },
    deletedAt: {
        type:Date,
        default : null
    },
    comment : {
        type : mongoose.Schema.Types.ObjectId,
        ref :'Comment'
    }

},
    {
        timestamps: true,
        versionKey: false
    })



const Post = mongoose.model("Post", postschema)

module.exports = Post