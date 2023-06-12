const express = require("express");
const router = new express.Router();
const OrderHistory = require("../src/models/orderHistory");
const {sendSuccesfulOrderMail} = require("./middlewares/sendMail");
const User = require("../src/models/users");

router.use(express.json());

router.post("/orderHistory", async (req, res) => {
  try {
    const order = req.body;
    const orderHis = new OrderHistory(order.orderHistory);
    await orderHis.save();
    let username = order.orderHistory.username;

    const user = await User.findOne({ username: username });
    sendSuccesfulOrderMail(user.email, username, orderHis);
    res.send({ message: "success" });
  } catch (err) {
    res.status(500).send(err);
  }
});

//get order history
router.get('/get-orderhistory',async(req,res) => {
  console.log("in get history",req.query.name)
  let username=req.query.name
  try{
    let newProducts = await OrderHistory.find({ username: username })
    console.log("pdts",newProducts)
    res.send({message:"Success",payload:newProducts})
  }
  catch(err){
    res.status(400).send();
  }
  

})

module.exports = router;
