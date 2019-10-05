const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: String,
  name: String,
  pass: String,
  active: Boolean,
})

module.exports = mongoose.model('User', UserSchema);