const express = require('express');
const router = express.Router()
const EventController = require('../controllers/EventController');
const {uploadEventsImg} = require('../middlewares/upload'); 


router.post('/create',uploadEventsImg.single('imagen'),EventController.create)
router.delete('/delete/:_id',EventController.delete)


module.exports = router;