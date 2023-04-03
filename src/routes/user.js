const router = require('express').Router()

const datavalidation = require('../middleware/datavalidation')

const validate_user = require('../validation/registervalidation')

const { createUser } = require('../controllers/registeruser')

const { loginUser } = require('../controllers/loginuser')

const { sendemailtouser } = require('../controllers/sendemail')

router.post('/register', datavalidation(validate_user), createUser)
router.post('/login', loginUser)
router.post('/sendemail',sendemailtouser)

module.exports = router;
