//cart items
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
  }
  // description: {
  //   type: String,
  //   required: true,
  //   minLength: 3,
  //   maxLength: 40,
  // },
  // price: {
  //   type: Number,
  //   required: true,
  //   min: 10,
  // },
  // count: {
  //   type: Number,
  //   required: true,
  //   min: 1,
  // },
  // image: {
  //   type: String,
  // },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
