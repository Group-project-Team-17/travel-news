const router = require('express').Router()
const UserController = require('../controllers/user-controller')
const AppController = require('../controllers/app-controller')
const Auth = require("../middlewares/authentication")

//Menambahkan Authentikasi untuk route setelah login
router.get('/', Auth.authentication, AppController.getIndex)
router.post('/register', UserController.postRegisterUser)
router.post('/login', UserController.postLoginUser)
router.get('/githublogin', UserController.githubLogin)

module.exports = router