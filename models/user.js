const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/newStudent");

const userSchema = mongoose.Schema({
    name: String,
    PRN: String,
    place: String
})

module.exports = mongoose.model('user', userSchema);