// const { find } = require("../models/Record")
const Record = require("../models/Record");

exports.addRecord = async (req, res, next) => {
  const info = req.body;
  try {
    const Records = await Record.create(info);
    res.json(Records);
  } catch (err) {
    next(err);
  }
};

exports.getRecords = async (req, res, next) => {
  try {
    const records = await Record.find();
    res.send(records);
  } catch (err) {
    next(err);
  }
};

exports.getRecord = async (req, res, next) => {
  const { id } = req.params;
  try {
    const record = await User.findById(id);
    res.json();
  } catch (err) {
    next(err);
  }
};

exports.updateRecord = async (req, res, next) => {
  const { id } = req.params;
  try {
    const recordUpdate = await Record.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(recordUpdate);
  } catch (err) {
    next(err);
  }
};

exports.deleteRecord = async (req, res, next) => {
  const { id } = req.params;
  try {
    const recordRemove = await Record.findByIdAndDelete(id);
    res.json(recordRemove);
  } catch (err) {
    next(err);
  }
};
