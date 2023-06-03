const express = require('express');
const router = express.Router()
const UserTypeController = require('../controllers/UserTypeController');


router.post('/create', UserTypeController.create)
router.delete("/delete/:_id", UserTypeController.delete);



module.exports = router;