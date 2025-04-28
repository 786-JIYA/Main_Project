const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    uid: { type: String, required: true },
    time: { type: String, required: true },
});



module.exports = mongoose.model('attendance', AttendanceSchema);