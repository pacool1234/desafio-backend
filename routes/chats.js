const express = require("express");
const ChatController = require("../controllers/ChatController");
const { authentication } = require("../middlewares/authentication");
const router = express.Router();

router.post("/create", ChatController.create); //authentication needed
router.put("/update/:_id", ChatController.update); //authentication needed
router.get("/getall", ChatController.getAll); //authentication needed
router.get("/getone/:_id", ChatController.getOne); //authentication needed
router.delete("/deleteAll", ChatController.deleteAll); //DEV PURPOSES


module.exports = router;
