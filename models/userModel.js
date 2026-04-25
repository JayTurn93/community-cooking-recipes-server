const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: 8,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },

}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;