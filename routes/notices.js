const express = require('express');
const router = express.Router()
const NoticeController = require('../controllers/NoticeController');
const {uploadNoticesImg} = require('../middlewares/upload'); 


router.post('/create',uploadNoticesImg.single('img'),NoticeController.create)
router.put('/update/:_id',NoticeController.update)
router.get('/get/:_id',NoticeController.getById)
router.get('/get',NoticeController.getAll)
router.put('/update/:_id',NoticeController.update)
router.delete('/delete/:_id',NoticeController.delete)


module.exports = router;