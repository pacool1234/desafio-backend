const Skill = require("../models/Skill");

const SkillController = {
    // Create a new Skill
    async create(req, res, next) {
        try {
            const newSkill = await Skill.create({
                ...req.body,
            });
            res.status(201).send({ message: "Skill created successfully", newSkill });
        } catch (error) {
            next(error);
        }
    },



    // Delete Tag
    async delete(req, res) {
        try {
            const skill = await Skill.findByIdAndDelete(req.params._id);
            if (!skill) {
                return res.status(404).send({ message: "SKILL not found" });
            }
            res.status(201).send({ message: `Deleted SKILL|| ${skill.name} ||`, skill });
        } catch (error) {
            console.error(error);
        }

    // Get ALL 

    },
        async getAll(req, res) {
            try {
              const skills = await Skill.find();
              res.send(skills);
            } catch (error) {
              console.error(error);
              res.status(500).send({ message: 'There has been a problem showing ALL SKILLS' });
            }
          },
          

};

module.exports = SkillController;