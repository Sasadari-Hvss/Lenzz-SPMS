const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { Jobes } = require("../util/Constants");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  selectedJob: {
    type: String,
    enum: [
      Jobes.SystemAdmin,
      Jobes.Projectmanager,
      Jobes.Developer,
      Jobes.TechLead,
      Jobes.Client,
      Jobes.Quality_Assurance_Enginner,
      Jobes.Other_Project_Workers,
    ],
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  verifytoken: {
    type: String,
  },
});

// static signup method
userSchema.statics.signup = async function (
  email,
  password,
  firstName,
  lastName,
  selectedJob
) {
  // validation
  if (!email || !password || !firstName || !lastName || !selectedJob) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }
  if (password && !validator.isLength(password, { min: 8 })) {
    res.status(400);
    throw new Error("Password must be at least 6 characters long");
  }
  if (!validator.isLength(firstName, { min: 2, max: 255 })) {
    res.status(400);
    throw new Error("First name must be between 2 and 255 characters");
  }

  if (!validator.isLength(lastName, { min: 2, max: 255 })) {
    res.status(400);
    throw new Error("Last name must be between 2 and 255 characters");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    password: hash,
    firstName,
    lastName,
    selectedJob,
  });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  } else if (!password) {
    throw Error(" Password must be filled");
  } else if (!email) {
    throw Error("Email must be filled");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }
  if (password && !validator.isLength(password, { min: 8 })) {
    res.status(400);
    throw new Error("Password must be at least 6 characters long");
  }

  return user;
};

userSchema.statics.forget = async function (email) {
  if (!email) {
    throw Error("Email must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }
  return user;
};

userSchema.statics.reset = async function (password) {
  if (!password) {
    throw Error("password is required");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);
  return user;
};
userSchema.statics.update = async function (
  firstName,
  lastName,
  email,
  password
) {
  // validation

  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    password: hash,
    firstName,
    lastName,
  });

  return user;
};

module.exports = mongoose.model("User", userSchema);
