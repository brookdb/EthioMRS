const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vitalsSchema = new Schema({
    date: String,
    height: String,
    weight: String,
    BMI: String,
    temperature: String,
    pulse: String,
    respiratory: String,
    bloodpressure: String,
    oxygensat: String
});

module.exports = mongoose.model('vitals', vitalsSchema);