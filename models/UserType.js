const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserTypeSchema = new mongoose.Schema({
    userType: {
        type: String,
        required: [true, "Please enter a userType"],
    },
   
    userId: {
        type: ObjectId,
        ref: 'User'
    },

}, { timestamps: true });



const UserType = mongoose.model('UserType', UserTypeSchema);

module.exports = UserType;