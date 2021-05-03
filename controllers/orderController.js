const Order = require("../models/Order");

exports.addOrder = async (req, res, next) => {
  const info = req.body;
  try {
    let newOrder = await Order.create(info);
    res.json(newOrder);
  } catch (err) {
    return err;
  }
};

exports.getOrder = async (req, res, next) => {
  let order = await Order.find()
    .select("-__v -items._id")
    .populate("user", "-_id firstname lastname email")
    .populate("records.record", "-_id title artist price"); // populate an ID field that is nested inside an array
  res.json(order);
};
