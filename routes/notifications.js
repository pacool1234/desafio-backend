const express = require('express');
const router = express.Router()
const NotificationController = require('../controllers/NotificationController');



router.post('/create', NotificationController.create)
router.delete("/delete/:_id", NotificationController.delete);


module.exports = router;