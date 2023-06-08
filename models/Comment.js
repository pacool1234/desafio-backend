const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const CommentSchema = new mongoose.Schema({
    body: String,
    userId: {type: ObjectId, ref: 'User' },
    noticeId: { type: ObjectId, ref: 'Notice' },
    likesUserC: [{ type: ObjectId, ref: 'User' }],

}, { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;