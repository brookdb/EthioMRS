const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    name: String,
    dob: String,
    contact: {
        phone: String,
        email: String,
        pobox: String
    },
    eci: {
        name: String,
        phone: String,
        relation: String
    },
    balance: Number,
    mednotes: String,
    deceased: Boolean
});

module.exports = mongoose.model('Patient', patientSchema);