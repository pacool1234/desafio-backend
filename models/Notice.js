const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const NoticeSchema = new mongoose.Schema({
    title: String,
    description: String,
    time: Date,
    img: String,
    likesUsers: [{ type: ObjectId, ref: 'User' }],

}, { timestamps: true }
);

const Notice = mongoose.model("Notice", NoticeSchema);
module.exports = Notice;