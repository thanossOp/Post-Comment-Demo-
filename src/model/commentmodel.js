const mongoose = require('mongoose')

const commentschema = new mongoose.Schema({

    comment: {
        type: String,
        required: true
    },
    author :{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'users'
    },
    post :{
        type :mongoose.Schema.Types.ObjectId,
        ref : 'posts'
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

},
    {
        timestamps: true,
        versionKey: false
    })


const Comment = mongoose.model("Comment", commentschema)

module.exports = Comment