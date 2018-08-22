const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  // can assign object to schema with options such as a default value
  credits: { type: Number, default: 0 }
});

mongoose.model('users', userSchema);
