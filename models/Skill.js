const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema({
    name: String,
     }, { timestamps: true }
);

const Skill = mongoose.model("Skill", SkillSchema);

module.exports = Skill;