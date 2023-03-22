const router = require('express').Router()

const checkrole = require('../middleware/checkrole')

const datavalidation = require('../middleware/datavalidation')

const validate_post = require('../validation/postvalidation')

const isAuth = require('../middleware/isAuth')

const { getallPost, createPost, updatePost, deletePost, searchPost } = require('../controllers/curdpost')

router.get('/post', isAuth(), getallPost)

router.post('/post', isAuth(), datavalidation(validate_post), createPost)

router.put('/post/:id',isAuth(['admin','user']), datavalidation(validate_post), updatePost)

router.delete('/post/:id', isAuth(['admin','user']), deletePost)

router.get('/post/:id', isAuth(), searchPost)

module.exports = router