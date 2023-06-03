const express = require('express');
const router = express.Router()
const UserTypeController = require('../controllers/EventController');


router.post('/create', EventController.create)
router.delete("/delete/:_id", EventController.delete);



module.exports = router;