const router = require('express').Router()
const NewsController = require('../controllers/news-controller')
const Auth = require("../middlewares/authentication")
//Add Auth to /news
router.get('/', Auth.authentication, NewsController.showAll)

module.exports = router