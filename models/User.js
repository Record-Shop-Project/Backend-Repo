const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema(
    {
        firstName : { type: String, required: true },
        lastName: { type: String, required: true },
        nickname: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        avatar: { type: String, required: true }
    }, {
        versionKey: false,
        timestamps: true }
)

const User = model('User', UserSchema);
module.exports = User;