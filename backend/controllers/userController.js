const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { IncomingForm } = require("formidable");
const fs = require("fs");
const bcrypt = require("bcrypt");
const axios = require("axios");

const createToken = (user) => {
  const { _id, name, email } = user;
  return jwt.sign({ _id, name, email }, process.env.SECRET, {
    expiresIn: "3d",
  });
};

const photoBuffer = async (photoPath) => {
  const photo = await fs.promises
    .readFile(photoPath.photo.filepath)
    .catch((err) => console.error("Failed to read file", err));

  const photo64 = {
    data: new Buffer.from(photo, "base64"),
    contentType: photoPath.photo.mimetype,
  };

  return photo64;
};

const defaultPhoto = async (imgPath, mimetype) => {
  const response = await axios.get(imgPath, { responseType: "arraybuffer" });
  const buffer = Buffer.from(response.data, "base64");
  const image64 = {
    data: buffer,
    contentType: mimetype,
  };
  return image64;
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user);

    res.status(200).json({ email: user.email, name: user.name, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  var user;
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

  const { name, email, password, gender, dob } = data.fields;

  try {
    if (Object.keys(data.files).length != 0) {
      let userPhoto = await photoBuffer(data.files);
      user = await User.signup(name, email, password, gender, userPhoto, dob);
    } else {
      let photo = await defaultPhoto(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        "image/png"
      );

      user = await User.signup(name, email, password, gender, photo, dob);
    }

    // create a token
    const token = createToken(user);

    return res.status(200).json({ name, email, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  const users = await User.find({ email: { $ne: req.params.id } }).sort({
    name: "asc",
  });

  res.status(200).json(users);
};

const getAllUsers = async (req, res) => {
  const users = await User.find().sort({
    name: "asc",
  });

  res.status(200).json(users);
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ email: req.params.id });

  res.status(200).json(user);
};

const updateSingleUser = async (req, res) => {
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

  try {
    if (data.fields.name != "") {
      await User.updateOne(
        {
          email: req.params.id,
        },
        {
          $set: {
            name: data.fields.name,
          },
        }
      );
    }

    if (data.fields.password != "") {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(data.fields.password, salt);

      await User.updateOne(
        {
          email: req.params.id,
        },
        {
          $set: {
            password: hash,
          },
        }
      );
    }

    if (Object.keys(data.files).length != 0) {
      const userPhoto = await photoBuffer(data.files);
      await User.updateOne(
        {
          email: req.params.id,
        },
        {
          $set: {
            photo: userPhoto,
          },
        }
      );
    }

    const user = await User.findOne({ email: req.params.id });
    const token = createToken(user);
    return res.status(200).json({ name: user.name, email: user.email, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
  getUsers,
  getSingleUser,
  getAllUsers,
  updateSingleUser,
};
