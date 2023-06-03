const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: [],
    time: date,
    atendees: [{ type: ObjectId, ref: 'User' }],
    eventTags: [],
    img: String, //multer- upload
     }, { timestamps: true }
);

const Events = mongoose.model("Event", EventSchema);

module.exports = Event;