
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
});

mongoose.model('users', userSchema);