const mongoose = require("mongoose");
const { Schema, model } = mongoose;

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
    toJSON:{virtuals: true}
  }
);

const User = model("User", UserSchema);
module.exports = User;
