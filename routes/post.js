const express = require("express")
const router = express.Router();
const postController = require('../controllers/postController')
const authenticate = require('../routes/verifyToken')

router.get('/', authenticate, postController.all_posts)

module.exports = router