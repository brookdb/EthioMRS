const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const visitSchema = new Schema({
    apntdate: String,
    startdate: String,
    enddate: String,
    doctorid: String,
    patientid: String,
    initialnotes: String,
    endnotes: String,
    payment: Number,
    active: Boolean,
    vitalsid: String
    
});

module.exports = mongoose.model('Visit', visitSchema);