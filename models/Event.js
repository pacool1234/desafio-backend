const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const EventSchema = new mongoose.Schema({
    title: {type: String},
    description: {type: String},
    date: [],
    time: Date,
    atendees: [{ type: ObjectId, ref: 'User' }],
    eventTags: [],
    img: {type: String} //multer- upload
     }, { timestamps: true }
);

const Events = mongoose.model("Event", EventSchema);

module.exports = Event;