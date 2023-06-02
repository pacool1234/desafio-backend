const mongoose = require("mongoose");
const Chat = require("../models/Chat");
const User = require("../models/User");


const ChatController = {
  async create(req, res) {
    try {
      const chat = await Chat.create(req.body);
      res.status(201).send({ message: "Chat created", chat });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async update(req, res) {
    try {
      await Chat.findByIdAndUpdate(req.params._id, {
        $push: { history: req.body.newMessage },
      });
      res.send({ message: "Chat history updated" });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },


};

module.exports = ChatController;
