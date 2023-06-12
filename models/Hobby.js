const mongoose = require("mongoose");

const HobbySchema = new mongoose.Schema({
    name: {type: String},
     }, { timestamps: true }
);

const Hobby = mongoose.model("Hobby", HobbySchema);

module.exports = Hobby;