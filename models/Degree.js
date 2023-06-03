const mongoose = require('mongoose');
// const ObjectId = mongoose.SchemaTypes.ObjectId;

const DegreeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a degree"],
    },

}, { timestamps: true });



const Degree = mongoose.model('Degree', DegreeSchema);

module.exports = Degree;