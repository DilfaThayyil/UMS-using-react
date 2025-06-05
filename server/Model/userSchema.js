const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  profilePicture:{
    type:String
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
