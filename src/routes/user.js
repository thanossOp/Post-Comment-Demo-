const router = require('express').Router()

const datavalidation = require('../middleware/datavalidation')

const validate_user = require('../validation/registervalidation')

const { createUser } = require('../controllers/registeruser')

const { loginUser, logoutuser } = require('../controllers/loginuser')
const isAuth = require('../middleware/isAuth')



router.post('/register', datavalidation(validate_user), createUser)

router.post('/login', loginUser)

module.exports = router;