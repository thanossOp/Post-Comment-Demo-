const {exc,excforarray }= require('../helper/exc')

const checkcomment = require('../middleware/checkCommentRole')
const Comment = require('../model/commentmodel')


//get all comment of particular user
const getAllComment = async (req, res) => {
    try {
        const postId = req.params.postid
        const getallcomment = await Comment.find({ post: postId })
        if (!getallcomment) {
            return res.status(404).json({
                status: 404,
                message: "Comments Not found"
            })
        }
        res.json({
            status: 200,
            messages: "All comments",
            data : excforarray(getallcomment)
        })
    } catch (error) {
        res.json({
            status: 401,
            messages: "You are not authorized"
        })
    }
}


const createComment = async (req, res) => {
    try {
        const newcomment = new Comment({
            comment: req.body.comment,
            author: req.user.id,
            post: req.params.postid
        })


        const comment = await newcomment.save()
        res.json({
            status: 200,
            message: "comment successfully",
            data: exc(comment)
        })
    } catch (error) {
        res.json({
            status: 401,
            messages: "You are not authorized"
        })
    }
}


const updateComment = async (req, res) => {
    try {
        if (checkcomment) {
            const id = req.params.id
            const updatecomment = await Comment.findByIdAndUpdate(id, req.body, {
                new: true
            })
            if (!updatecomment) {
                return res.status(404).json({
                    status: 404,
                    message: "Comment Not found"
                })
            }
            res.status(200).json({
                status: 200,
                message: "Update comment successfully",
                data: exc(updatecomment)
            })
        }

    } catch (error) {
        res.status(401).json({
            status: 401,
            messages: "You are not authorized"
        })
    }
}

const deleteComment = async (req, res) => {

    try {
        if (checkcomment) {
            const id = req.params.id
            const deletecomment = await Comment.findOneAndUpdate({ _id: id, isDeleted: false }, {
                $set: {
                    isDeleted: true,
                    deletedBy: req.user._id,
                    deletedAt: new Date()
                },

            }, {
                new: true
            })

            if (!deletecomment) {
                return res.status(404).json({
                    status: 404,
                    message: "Comment Not found"
                })
            }
            res.status(200).json({
                status: 200,
                message: "Delete comment successfully",
                data: deletecomment
            })
        }
    }
    catch (error) {
        res.status(401).json({
            status: 401,
            messages: "You are not authorized"
        })
    }
}

module.exports = { getAllComment, createComment, updateComment, deleteComment }