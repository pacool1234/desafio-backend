const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const NotificationSchema = new mongoose.Schema({
    body: [{ type: ObjectId, ref: 'Event' }],
}, { timestamps: true }
);

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;