const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = "dontstealourdata12345";

const UserSchema = new Schema(
  {
    id: false,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    nickname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: false, default: '/statics/01.gif' },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

UserSchema.pre('save', function () {
  const user = this;
  // convert plain password to password hash (but ONLY if password was modified)
  if (user.isModified('password')) {
    user.password = bcryptjs.hashSync(user.password, 8); // 8 = salting rounds
  }
});

UserSchema.virtual('fullName').get(function () {
  return this.firstName + ' ' + this.lastName;
});

// Generate token method
UserSchema.methods.generateAuthToken = function () {
  console.log(this); // user
  const user = this;
  // additionally making sure, the JWT ticket itself will expire at some point (in this case in 3 hours)
  const token = jwt.sign({ _id: user._id.toString() }, secretKey, { expiresIn: '3h' }).toString();

  return token;
};

// Find By token
UserSchema.statics.findByToken = function (token) {
  const User = this;

  // Decode the cookie
  try {
    // if the token is valid then we get back whatever we
    // signed the cookie with  -> { _id: user._id.toString() }
    let decoded = jwt.verify(token, secretKey);
    console.log(`decoded`, decoded);
    return User.findOne({ _id: decoded._id });
  } catch (error) {
    return;
  }
};

const User = model('User', UserSchema); // => todos
module.exports = User;
