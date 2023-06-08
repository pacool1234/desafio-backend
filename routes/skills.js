const express = require('express');
const router = express.Router()
const SkillController = require('../controllers/SkillController');



router.post('/create', SkillController.create)
router.delete("/delete/:_id", SkillController.delete);
router.get("/getAll", SkillController.getAll);


module.exports = router;