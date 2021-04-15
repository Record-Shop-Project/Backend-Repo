const Order = require('../models/Order');

exports.addOrder = async (req, res, next) => {
    try{
        let newOrder = await Order.create(req.body);
        res.json(newOrder)
    } catch(err) {
        next(err) 
    }
}

// exports.upDateOrder = async (req, res, next) => {

// }

exports.getOrders = async (req, res, next) => {
    let order = await Order.find()
    .select("-__v -items._id")
    .populate("user", "-_id firstname lastname email")
    .populate("records.record", "-_id title artist price"); // populate an ID field that is nested inside an array
    res.json(order)
}

exports.getOrder = async (req, res, next) => {
    let order = await Order.findById(req.params.id)
    .select("-__v -items._id")
    .populate("user", "-_id firstname lastname email")
    .populate("records.record", "-_id title artist price"); // populate an ID field that is nested inside an array
    res.json(order)
}