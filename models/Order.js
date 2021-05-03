const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// we nest this Schema inside the OrderSchema below
const OrderItemSchema = new Schema({
  record: { type: Schema.Types.ObjectId, ref: "Record", required: true },
  quantity: { type: Number, required: true },
});

const OrderSchema = new Schema({
  date: { type: Date, default: Date.now },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  records: [OrderItemSchema], // nest order items
});

const Order = model("Order", OrderSchema);
module.exports = Order;
