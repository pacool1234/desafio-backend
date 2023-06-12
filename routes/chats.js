const express = require("express");
const ChatController = require("../controllers/ChatController");
const { authentication } = require("../middlewares/authentication");
const router = express.Router();

router.post("/create", authentication, ChatController.create);
router.put("/update/:_id", authentication, ChatController.update);
// router.post("/create", ChatController.create);
// router.put("/update/:_id", ChatController.update);
router.get("/getall", ChatController.getAll); 
router.get("/getchatsfromuser", authentication, ChatController.getChatsFromUser);
router.get("/getone/:_id", authentication, ChatController.getOne);
router.delete("/deleteAll", ChatController.deleteAll); //DEV PURPOSES - NEVER USE IT!!!


module.exports = router;