const router = require('express').Router()

const { updaterole, getalluser } = require('../controllers/admin')

const isAuth = require('../middleware/isAuth')


const admin = require('../middleware/admin')

router.get("/register", isAuth('admin'), getalluser)
router.patch('/assignrole/:id', isAuth('admin'), updaterole)

module.exports = router