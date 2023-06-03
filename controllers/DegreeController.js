const Degree = require("../models/Degree");

const DegreeController = {
    // Create a new degree
    async create(req, res, next) {
        try {
            const newDegree = await Degree.create({
                ...req.body,
            });
            res.status(201).send({ message: "Degree created successfully", newDegree });
        } catch (error) {
            next(error);
        }
    },


    // Delete degree
    async delete(req, res) {
        try {
            const degree = await Degree.findByIdAndDelete(req.params._id);
            if (!degree) {
                return res.status(404).send({ message: "Degree not found" });
            }
            res.status(201).send({ message: `Deleted degree || ${degree.name} ||`, degree });
        } catch (error) {
            console.error(error);
        }
    },


};

module.exports = DegreeController;