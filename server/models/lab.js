const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const labSchema = new Schema({
    date: String,
    visitid: String,
    notes: String,
    payment: Number,
    paied: Boolean
});

module.exports = mongoose.model('Lab', labSchema);