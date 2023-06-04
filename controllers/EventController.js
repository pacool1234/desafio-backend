const Event = require("../models/Event");

const EventController = {
    
  async create(req, res) {
    try {
      let imgPath;
      if (req.file) {
        imgPath = req.file.path;
      }
      const event = await Event.create({
        ...req.body,
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
      res.send({ event, message: 'EVENT Removed' })
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: 'There has been a problem deleting the EVENT'})
    }
  },


};

module.exports = EventController;