const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const userId = {
  type: ObjectId,
  ref: "User",
};


const ChatSchema = new mongoose.Schema({

    users: [ userId ],
    
    history: {
        type: Array
    },


}, { timestamps: true });

module.exports = mongoose.model('Chat', ChatSchema);
