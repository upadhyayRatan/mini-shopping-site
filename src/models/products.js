const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
  },
  productId:{
    type:Number,
    required:true
  },
  category:{
    type:String,
    required:true
  },
  productDescription: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 40,
  },
  productPrice: {
    type: Number,
    required: true,
    min: 10,
  },
  productCount:{
      type:Number,
      required:true,
      min:1,
  },
  productImage:{
      type:String,
  },
  productInCart:{
    type:Boolean,
    required:true
  }
});

//productSchema.set('toJSON', { getters: true, virtuals: false });
productSchema.set('toObject', { getters: true });
const Product = mongoose.model("Products", productSchema);

module.exports = Product;
