const Event = require("../models/Event");
const User = require("../models/User");
const Tag = require("../models/Tag");

const EventController = {

  async create(req, res) {
    try {
      let imgPath;
      if (req.file) {
        imgPath = req.file.path;
      }

      const eventTags = await Tag.findById(req.body.eventTags);

      const event = await Event.create({
        title: req.body.title,
        description: req.body.description,
        time: req.body.time,
        date: req.body.date,
        eventTags: eventTags,
        img: imgPath,
      });

      res.status(201).send({ message: "EVENT successful created", event });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "There has been a problem creating the EVENT" });
    }
  },


  async delete(req, res) {
    try {
      const event = await Event.findByIdAndDelete(req.params._id)
      // Delete event._id from User.suscriptions from all users attending said event
      res.send({ event, message: 'EVENT Removed' })
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: 'There has been a problem deleting the EVENT' })
    }
  },


};

module.exports = EventController;