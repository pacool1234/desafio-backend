const Tag = require("../models/Tag");

const TagController = {
    // Create a new Tag
    async create(req, res, next) {
        try {
            const newTag = await Tag.create({
                ...req.body,
            });
            res.status(201).send({ message: "Tag created successfully", newTag });
        } catch (error) {
            next(error);
        }
    },



    // Delete Tag
    async delete(req, res) {
        try {
            const tag = await Tag.findByIdAndDelete(req.params._id);
            if (!tag) {
                return res.status(404).send({ message: "Tag not found" });
            }
            res.status(201).send({ message: `Deleted Tag|| ${tag.name} ||`, tag });
        } catch (error) {
            console.error(error);
        }

    // Get ALL 

    },
        async getAll(req, res) {
            try {
              const tags = await Tag.find();
              res.send(tags);
            } catch (error) {
              console.error(error);
              res.status(500).send({ message: 'There has been a problem showing ALL TAGS' });
            }
          },
          

};

module.exports = TagController;