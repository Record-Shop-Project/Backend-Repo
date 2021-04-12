const Record = require('../models/Record');

exports.getRecords = async (req, res, next) => {
  let records = await Record.find();
  res.send(records);
};

exports.getRecord = async (req, res, next) => {
  const { id } = req.params;

  try {
    const record = await Record.findById(id);
    res.json(record);
  } catch (err) {
    next(err); // forward error of not found todo
  }
};

exports.updateRecord = async (req, res, next) => {
  const { id } = req.params;

  try {
    let updatedRecord = await Record.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedRecord);
  } catch (err) {
    next(err);
  }
};

exports.addRecord = async (req, res, next) => {
  const data = req.body;

  try {
    const record = await Record.create(data);
    res.json(record);
  } catch (err) {
    next(err); // forward error to central error handler
  }
};

exports.deleteRecord = async (req, res, next) => {
  const { id } = req.params;

  try {
    let record = await Record.findByIdAndDelete(id);
    res.json(record);
  } catch (err) {
    let error = new Error(`Todo with ID ${id} does not exist`);
    error.status = 400;
    next(error);
  }
};
