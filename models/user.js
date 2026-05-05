const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name: String,
    PRN: String,
    place: String
})

module.exports = mongoose.model('user', userSchema);