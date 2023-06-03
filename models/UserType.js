const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a userType"],
    },

}, { timestamps: true });



const UserType = mongoose.model('UserType', UserTypeSchema);

module.exports = UserType;