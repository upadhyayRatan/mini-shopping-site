const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const router = new express.Router();
const multerObj = require("../APIS/middlewares/addProductImage");
const Product = require("../src/models/products");
const auth = require('./middlewares/auth')
router.use(express.json());

router.post(
  "/addProduct",
  multerObj.single("photo"),
  expressAsyncHandler(async (req, res) => {
    console.log("In add product");
    //get productOBJ
    const productObj = JSON.parse(req.body.productObj);
    productObj.productImage = req.file.path;
    productObj.productName = productObj.productName.toLowerCase();
    productObj.productInCart = false;
    const product = new Product(productObj);
    try {
      //if product present update product count
      const checkProd = await Product.findOne({
        productName: product.productName,
      });
      console.log("Product", checkProd);
      if (checkProd) {
        //update count
        let totalCount = checkProd.productCount + product.productCount;
        let newProduct = await Product.updateOne(
          { productName: product.productName },
          { $set: { productCount: totalCount } }
        );
        res.status(200).send({ message: "product updated" });
      } else {
        //insert product
        await product.save();
        //let newProduct = await Product.insertOne(product);
        res.status(200).send({ message: "product added " });
      }
    } catch (e) {
      res.status(500).send({ message: `Internal server error ${e}` });
    }
  })
);

//get products
router.get(
  "/getProducts",
  expressAsyncHandler(async (req, res) => {
    try {
      let productsObj = await Product.find({});
      res.send({ message: "success", payload: productsObj });
    } catch (e) {
      res.status(400).send(e);
    }
  })
);

//Verify User logged in
router.get('/addToCart',auth,(req,res)=>{
  console.log("in add cart api")
  res.send({message:"success"});
})

module.exports = router;
