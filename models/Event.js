const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    title: String,
    descripcion: String,
    date: [],
    time: date,
    atendees: [],
    eventTags: [],
    image: String, //multer
     }, { timestamps: true }
);

const Evento = mongoose.model("Evento", EventoSchema);

module.exports = Evento;