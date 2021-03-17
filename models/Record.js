const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const RecordSchema = new Schema(
    {
        cover: { type: String, required: true },
        title: { type: String, required: true },
        artist: { type: String, required: true },
        year: { type: Date, required: true }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const Record = model('Record', RecordSchema);
module.exports = Record;