const express = require('express');
const router = express.Router()
const HobbyController = require('../controllers/HobbyController');



router.post('/create', HobbyController.create)
router.delete("/delete/:_id", HobbyController.delete);
router.get("/getAll", HobbyController.getAll);


module.exports = router;