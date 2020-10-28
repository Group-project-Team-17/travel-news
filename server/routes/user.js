const router = require('express').Router()
const UserController = require('../controllers/user-controller')
const AppController = require('../controllers/app-controller')

router.get('/', AppController.getIndex)
router.post('/register', UserController.postRegisterUser)
router.post('/login', UserController.postLoginUser)

module.exports = router