const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    name: String,
    specialty: String
});

module.exports = mongoose.model('Doctor', doctorSchema);