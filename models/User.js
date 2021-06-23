const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypte = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter Email"],
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Min pass lenght is 6"],
  },
});

// userSchema.post("save", (doc, next) => {
//   console.log("New user was created and saved ", doc);
//   next();
// });

userSchema.pre("save", async function (next) {
  const salt = await bcrypte.genSalt();
  this.password = await bcrypte.hash(this.password, salt);
  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
