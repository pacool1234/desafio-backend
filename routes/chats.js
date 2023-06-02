const express = require("express");
const ChatController = require("../controllers/ChatController");
const { authentication } = require("../middlewares/authentication");
const router = express.Router();

router.post("/create", ChatController.create); //authentication needed
router.put("/update/:_id", ChatController.update); //authentication needed


module.exports = router;
