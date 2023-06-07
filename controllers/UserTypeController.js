const UserType = require("../models/UserType");

const UserTypeController = {
    // Create a new userType
    async create(req, res, next) {
        try {
            const newUserType = await UserType.create({
                ...req.body,
            });
            res.status(201).send({ message: "UserType created successfully", newUserType });
        } catch (error) {
            next(error);
        }
    },


    // Delete userType
    async delete(req, res) {
        try {
            const userType = await UserType.findByIdAndDelete(req.params._id);
            if (!userType) {
                return res.status(404).send({ message: "UserType not found" });
            }
            res.status(201).send({ message: `Deleted userType || ${userType.name} ||`, userType });
        } catch (error) {
            console.error(error);
        }
    },

   // Get All userType

    async getAll(req, res) {
        try {
          const userTypes = await UserType.find();
          res.send(userTypes);
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: 'There has been a problem showing ALL USERTYPES' });
        }
      },
      

};

module.exports = UserTypeController;