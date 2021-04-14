const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const RecordSchema = new Schema(
  {
    cover: { type: String, required: true },
    title: { type: String, default: false },
    artist: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Record = model('Record', RecordSchema); // => todos
module.exports = Record;
