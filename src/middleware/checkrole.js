const Post = require('../model/postmodel')
async function checkrole(req,res,next){
    const postId= req.params?.id;
    const post = await Post.findById(postId).populate('author')

    const user = req.user._id
    const puser = post.author._id

    if(req.user.role == "admin"){
        return next()
    }
    if(user.toString() === puser.toString()){
        return next()
    }else{
        res.json({
            status : 401,
            messages : "You are not authorized"
        })
    }
}

  
module.exports = checkrole  