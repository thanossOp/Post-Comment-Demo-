const Post = require('../model/postmodel')
const Comment = require('../model/commentmodel')


async function checkcomment(req, res, next) {
    try {

        const commentid = req.params.id
        const postid = req.params.postid
        const user = req.user._id

        const comment = await Comment.findById(commentid).populate('author')
        const post = await Post.findById(postid).populate('author')
        const commentowner = comment.author._id
        const postauthor = post.author._id



        if (req.user.role == "admin") {
            return next()
        }
        if (user.toString() === postauthor.toString()) {
            return next()
        }
        if (user.toString() === commentowner.toString()) {
            return next()
        }
        else {
            res.json({
                status: 401,
                messages: "You are not authorized"
            })
        }

    } catch (error) {
        res.json({
            status: 401,
            messages: "You are not authorized"
        })
    }
}


module.exports = checkcomment

