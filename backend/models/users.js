const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  email: {
    type: String,
    trim: true,
    required: "Please enter an email address",
  },
  username: {
    type: String,
    trim: true,
    required: "Please enter a valid Username",
  },
  password: {
    type: String,
    trim: true,
    required: "Please enter a valid Password",
  }
});

UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;