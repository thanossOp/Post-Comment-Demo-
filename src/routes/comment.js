const router = require('express').Router()

const { getAllComment, createComment, updateComment, deleteComment } = require('../controllers/commentcurd')

const checkcomment = require('../middleware/checkCommentRole')

const isAuth = require('../middleware/isAuth')

router.get('/post/:postid/comment', isAuth(), getAllComment)

router.post('/post/:postid/comment', isAuth(), createComment)

router.put('/post/:postid/comment/:id', isAuth(), updateComment)

router.delete('/post/:postid/comment/:id', isAuth(), deleteComment)

module.exports = router
