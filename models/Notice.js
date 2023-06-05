const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const NoticeSchema = new mongoose.Schema({
    title: String,
    description: String,
    time: Date,
    noticeTags: [{ type: ObjectId, ref: 'Tag' }],
    img: String,
}, { timestamps: true }
);

const Notice = mongoose.model("Notice", NoticeSchema);
module.exports = Notice;