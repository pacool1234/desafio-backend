const express = require('express');
const router = express.Router()
const DegreeController = require('../controllers/DegreeController');


router.post('/create', DegreeController.create)
router.delete("/delete/:_id", DegreeController.delete);



module.exports = router;