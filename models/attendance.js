const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    uid: { type: String, required: true },
    time: { type: String, default: Date.now },
});



module.exports = mongoose.model('attendance', AttendanceSchema);