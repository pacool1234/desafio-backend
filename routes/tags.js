const express = require('express');
const router = express.Router()
const TagController = require('../controllers/TagController');



router.post('/create', TagController.create)
router.delete("/delete/:_id", TagController.delete);


module.exports = router;