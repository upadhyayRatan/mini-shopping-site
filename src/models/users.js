const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt=require('bcrypt')
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trime: true,
    minLength: 3,
  },
  username: {
    type: String,
    trim: true,
    required: true,
    validate(username) {
      if (username.length < 6)
        throw new Error("username number must be of 6 digits");
    },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  password: {
    type: String,
    trim: true,
    required: true,
    validate(password) {
      if (password.length < 6)
        throw new Error("Password must be greater than 5");
      if (password.toLowerCase().includes("password"))
        throw new Error("Password should not contain 'password' ");
    },
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});
const User = mongoose.model("User", userSchema);

module.exports = User;
