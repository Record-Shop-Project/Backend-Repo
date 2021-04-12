const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    nickName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: false, default: "/images/avatar1.jpg" },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: { virtuals: true },
  }
);
// password hashing

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    console.log(`the password is ${this.password}`);
    this.password = await bcrypt.hash(this.password, 10);
    console.log(`the bcrypt password is ${this.password}`);
  }
  next();
});

// Generate token method
UserSchema.methods.generateAuthToken = function () {
  console.log(this); // user
  const user = this;
  const ourSuperSecretKey = "thisisalongandsecurestring";
  const token = jwt
    .sign({ _id: user._id.toString() }, ourSuperSecretKey)
    .toString();

  return token;
};

// Find By token
// UserSchema.statics.findByToken = function (token) {
//   const User = this;
//   const ourSuperSecretKey = "thisisalongandsecurestring";

//   // Decode the cookie
//   try {
//     let decoded = jwt.verify(token, ourSuperSecretKey);
//     console.log(`decoded=>`, decoded);
//     return User.findOne({ _id: decoded._id });
//   } catch (error) {
//     return;
//   }
// };
const User = model("User", UserSchema);
module.exports = User;
