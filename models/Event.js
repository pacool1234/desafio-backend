const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    title: {type: String},
    description: {type: String},
    date: [],
    time: date,
    atendees: [{ type: ObjectId, ref: 'User' }],
    eventTags: [],
    img: {type: String} //multer- upload
     }, { timestamps: true }
);

const Events = mongoose.model("Event", EventSchema);

module.exports = Event;