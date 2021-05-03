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
    emailVerificationToken: { type: String, required: true }, // we add emailVerificationToken because we want when user sign up with his email we add a token with that email.and we send it in his inbox of email for varification.
    emailIsVerified: { type: Boolean, default: false },
    googleId: { type: String },
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
  const ourSuperSecretKey = process.env.SECRET_KEY;
  const token = jwt
    .sign({ _id: user._id.toString() }, ourSuperSecretKey)
    .toString();

  return token;
};

// Generate token method for email
UserSchema.methods.generateEmailVerifToken = function () {
  const user = this;
  // additionally making sure, the JWT ticket itself will expire at some point (in this case in 3 hours)
  const token = jwt
    .sign(
      { _id: user._id.toString(), email: user.email },
      process.env.SECRET_KEY,
      {
        expiresIn: "120h",
      }
    )
    .toString();

  return token;
};

// Find By verif Token
UserSchema.statics.findByVerifToken = function (token) {
  const User = this;

  // Decode the token
  try {
    let decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(`decoded`, decoded);
    return User.findOne({ _id: decoded._id, email: decoded.email });
  } catch (error) {
    return;
  }
};

const User = model("User", UserSchema);
module.exports = User;
