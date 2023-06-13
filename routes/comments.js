const express = require('express');
const router = express.Router()
const CommentController = require('../controllers/CommentController');
const { authentication } = require("../middlewares/authentication");



router.post('/create/:_id',authentication , CommentController.create)
router.put('/update/:_id',authentication , CommentController.update)
router.get('/getAll',authentication , CommentController.getAll)
router.get('/getbyId/:_id',authentication , CommentController.getById)
router.delete('/delete/:_id',authentication , CommentController.delete)


module.exports = router;