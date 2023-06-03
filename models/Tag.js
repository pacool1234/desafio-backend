const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
    name: {type: String},
     }, { timestamps: true }
);

const Tag = mongoose.model("tag", TagSchema);

module.exports = Tag;