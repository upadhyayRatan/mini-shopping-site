//order history

//cart items
const mongoose = require("mongoose");

const orderHistory = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  products: {
    type: Array,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  orderId:{
    type:Number,
    required:true,
  }
});

const OrderHistory = mongoose.model("OrderHistory", orderHistory);

module.exports = OrderHistory;
