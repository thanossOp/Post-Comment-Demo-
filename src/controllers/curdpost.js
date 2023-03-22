const { exc, excforarray } = require('../helper/exc')
const Post = require('../model/postmodel')

const getallPost = async (req, res) => {

    try {
        const post = await Post.find({isDeleted:false})

        if (!getallPost) {
            return res.status(404).json({
                status: 404,
                message: "Comment Not found"
            })
        }
        res.status(200).json({
            status: 200,
            message: "This is all post",
            data: excforarray(post)

        })

    } catch (error) {
        res.status(400).send("Not valid Post")
    }
}

const createPost = async (req, res) => {
    try {
        const newPost = new Post({
            post_name: req.body.post_name,
            caption: req.body.caption,
            isDeleted: req.body.isDeleted,
            deletedBy: req.body.deletedBy,
            deletedAt: req.body.deletedAt,
            author: req.user._id
        })

        const createdpost = await newPost.save()
        res.status(200).json({
            status: 200,
            message: "Create post successfully",
            data: exc(createdpost)
        })

    } catch (error) {
        res.status(401).json({
            status: 401,
            messages: "You are not authorized"
        })
    }
}

const searchPost = async (req, res) => {
    try {
        const id = req.params.id
        const searchpost = await Post.findById({_id:id,isDeleted:false})
        if (!searchpost) {
            return res.status(404).json({
                status: 404,
                message: "Post Not found"
            })
        }
        res.status(200).json({
            status: 200,
            message: "This is your searched Post",
            data: exc(searchpost)
        })
    } catch (error) {
        res.status(401).json({
            status: 401,
            messages: "You are not authorized"
        })
    }
}

const updatePost = async (req, res) => {
    try {
        const id = req.params.id
        const updatedpost = await Post.findOneAndUpdate({ _id: id ,isDeleted:false}, { ...req.body }, { new: true })

        if (!updatedpost) {
            return res.status(404).json({
                status: 404,
                message: "Post Not found"
            })
        }
        res.status(200).json({
            status: 200,
            message: "Update successfully",
            data: exc(updatedpost)
        })


    } catch (error) {
        res.status(401).json({
            status: 401,
            messages: "You are not authorized"
        })
    }
}

const deletePost = async (req, res) => {
    try {
        const id = req.params.id
        const deletepost = await Post.findOneAndUpdate({ _id: id, isDeleted: false }, {
            $set: {
                isDeleted: true,
                deletedBy: req.user._id,
                deletedAt: new Date()
            },

        }, {
            new: true
        })

        if (!deletepost) {
            return res.status(404).json({
                status: 404,
                message: "Post Not found"
            })
        }
        res.status(200).json({
            status: 200,
            message: "Delete successfully",
            data: deletepost
        })
    } catch (error) {
        res.status(401).json({
            status: 401,
            messages: "You are not authorized"
        })
    }
}

module.exports = { createPost, getallPost, searchPost, updatePost, deletePost }