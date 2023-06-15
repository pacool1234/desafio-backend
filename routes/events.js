const express = require('express');
const router = express.Router()
const EventController = require('../controllers/EventController');
const {uploadEventsImg} = require('../middlewares/upload'); 


router.post('/create',uploadEventsImg.single('img'),EventController.create)
router.put('/updateimg/:_id',uploadEventsImg.single('img'),EventController.updateImage)
router.delete('/delete/:_id',EventController.delete)
router.get('/getEventById/:_id',EventController.getById)
router.get('/getAll',EventController.getAll)
router.put('/update/:_id',EventController.update)


module.exports = router;