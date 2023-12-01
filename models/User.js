const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please! Enter an Email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please! Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please! Enter a Password"],
    minlength: [6, "Password must be more than 6 characters"],
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
