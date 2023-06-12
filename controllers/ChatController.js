const mongoose = require("mongoose");
const Chat = require("../models/Chat");
const User = require("../models/User");

const ChatController = {
  async create(req, res) {
    try {
      req.body.history[0].date = new Date();
      const chat = await Chat.create(req.body);
      req.body.users.forEach(async (userId) => {
        await User.findByIdAndUpdate(userId, {
          $push: { chat: chat._id },
        });
      });
      res.status(201).send({ message: "Chat created", chat });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async update(req, res) {
    try {
      req.body.date = new Date();
      await Chat.findByIdAndUpdate(req.params._id, {
        $push: { history: req.body },
      });
      res.send({ message: "Chat history updated" });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async getAll(req, res) {
    try {
      const chats = await Chat.find();
      res.send(chats);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async getChatsFromUser(req, res) {
    try {
      const user = await User.findById(req.user._id);
      const chatIdArray = user.chat;
      const chats = await Chat.find({
        _id: {
          $in: chatIdArray,
        },
      }).populate("users", "username img");
      res.send(chats);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async getOne(req, res) {
    try {
      const chat = await Chat.findById(req.params._id).populate(
        "users",
        "username img"
      );
      res.send(chat);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async deleteAll(req, res) {
    try {
      await Chat.deleteMany({});
      await User.updateMany({}, { $set: { chat: [] } });
      res.send({ message: "Chats deleted" });
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = ChatController;
