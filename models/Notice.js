const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const NoticeSchema = new mongoose.Schema({
    title: String,
    description: String,
    time: Date,
    img: String,
    userId: { type: ObjectId, ref: 'User' },
    likesUsers: [{ type: ObjectId, ref: 'User' }],
    commentIds: [{ type: ObjectId, ref: 'Comment' }],

}, { timestamps: true }
);

const Notice = mongoose.model("Notice", NoticeSchema);
module.exports = Notice;