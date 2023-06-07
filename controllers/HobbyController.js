const Hobby = require("../models/Hobby");

const HobbyController = {
    // Create a new Hobby
    async create(req, res, next) {
        try {
            const newHobby = await Hobby.create({
                ...req.body,
            });
            res.status(201).send({ message: "Hobby created successfully", newHobby });
        } catch (error) {
            next(error);
        }
    },



    // Delete Tag
    async delete(req, res) {
        try {
            const hobby = await Hobby.findByIdAndDelete(req.params._id);
            if (!hobby) {
                return res.status(404).send({ message: "HOBBY not found" });
            }
            res.status(201).send({ message: `Deleted HOBBY|| ${hobby.name} ||`, hobby });
        } catch (error) {
            console.error(error);
        }

    // Get ALL 

    },
        async getAll(req, res) {
            try {
              const hobbies = await Hobby.find();
              res.send(hobbies);
            } catch (error) {
              console.error(error);
              res.status(500).send({ message: 'There has been a problem showing ALL HOBBIES' });
            }
          },
          

};

module.exports = HobbyController;