const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = new Schema({
    labid: String,
    testname: String,
    testresult: String,
    notes: String
});

module.exports = mongoose.model('test', testSchema);