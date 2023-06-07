const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const CommentSchema = new mongoose.Schema({
    target: { type: ObjectId, ref: 'Notice' },
    title: {type: String},
    description: {type: String},
}, { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;