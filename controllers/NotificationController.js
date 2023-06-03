const Notification = require("../models/Notification")

const NotificationController = {
    // Create a new Notification
    async create(req, res, next) {
        try {
            const newNotification = await Notification.create({
                ...req.body,
            });
            res.status(201).send({ message: "Notification created successfully", newNotification });
        } catch (error) {
            next(error);
        }
    },


    // Delete Notification
    async delete(req, res) {
        try {
            const notification = await Notification.findByIdAndDelete(req.params._id);
            if (!notification) {
                return res.status(404).send({ message: "Notification not found" });
            }
            res.status(201).send({ message: `Deleted Notification|| ${notification.name} ||`, notification });
        } catch (error) {
            console.error(error);
        }
    },


};

module.exports = NotificationController;