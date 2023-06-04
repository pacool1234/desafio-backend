const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const EventSchema = new mongoose.Schema({
    title: String,
    description: String,
    time: Date,
    attendees: {
        type: [{ type: ObjectId, ref: 'User' }],
        default: []
      },
    eventTags: [{ type: ObjectId, ref: 'Tag' }],
    img: String,
}, { timestamps: true }
);

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;