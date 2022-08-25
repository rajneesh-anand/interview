const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dateofbirth: {
    type: Date,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
});

userSchema.statics.signup = async function (
  name,
  email,
  password,
  gender,
  userPhoto,
  dob
) {
  if (!email || !password || !name) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email not valid !");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use !");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    name,
    email,
    password: hash,
    gender,
    photo: userPhoto,
    dateofbirth: dob,
  });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Email does not exists !");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Password is wrong !");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
