const Event = require("../models/Event");
const User = require("../models/User");
const Tag = require("../models/Tag");

const EventController = {
//ENDPOINT: CREATE EVENT
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

  async updateImage(req, res) {
    try {
      const eventId = req.params._id;
      const { img } = req.body;
  
      const event = await Event.findByIdAndUpdate(
        eventId,
        { img },
        { new: true }
      );
  
      if (!event) {
        return res.status(404).send({ message: 'Evento no encontrado' });
      }
  
      if (req.file) {
        event.img = req.file.filename;
        await event.save();
      }
  
        
      res.send({ message: 'Evento actualizado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Ha ocurrido un error al actualizar el evento' });
    }
  },
  




//ENDPOINT: GET EVENT BY ID
async getById(req, res) {
  try {
      const event = await Event.findById(req.params._id)
      res.send(event)
  } catch (error) {
      console.error(error);
  }
},


//ENDPOINT: GET ALL EVENTS

async getAll(req, res) {
  try {
    const notices = await Event.find()
      .populate({
        path: 'eventTags',
        select: 'name',
      })
      .exec();

    res.send(notices);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'There has been a problem showing ALL NOTICES' });
  }
},


//ENDPOINT: DELETE EVENT
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
    //ENDPOINT: UPDATE EVENT
    async update(req, res) {
      try {
          const event = await Event.findByIdAndUpdate(req.params._id, req.file,
              { new: true })
          res.send({ message: " This EVENT has been successfully updated:", event });
      } catch (error) {
          console.error(error);
      }
  },


};

module.exports = EventController;