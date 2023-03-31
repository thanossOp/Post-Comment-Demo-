const router = require('express').Router()

const checkrole = require('../middleware/checkrole')

const datavalidation = require('../middleware/datavalidation')

const validate_post = require('../validation/postvalidation')

const checkredis = require('../middleware/redis')

const isAuth = require('../middleware/isAuth')

const { getallPost, createPost, updatePost, deletePost, searchPost } = require('../controllers/curdpost')

router.get('/post', isAuth(), checkredis, getallPost)
router.get('/post/:id', isAuth(), checkredis, searchPost)
router.post('/post', isAuth(), datavalidation(validate_post), createPost)
router.put('/post/:id', isAuth(['admin', 'user']), datavalidation(validate_post), updatePost)
router.delete('/post/:id', isAuth(['admin', 'user']), deletePost)

module.exports = router