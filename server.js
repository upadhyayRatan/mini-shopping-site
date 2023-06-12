const express=require('express')
const app= express()
const path=require('path')
const mongoose=require('mongoose')
const userRouter=require('./APIS/userApi');
const productRouter = require('./APIS/productApi');
const cartRouter = require('./APIS/cartApi');

//const connectionUrl="mongodb://localhost:27017/shopping-site"
//const databaseName="shopping-site"

app.use(express.static(path.join(__dirname,"./build")))

mongoose.connect(process.env.CONNECTION_URL,{ useNewUrlParser: true },async(error,client)=>{
    if(error){
        console.log("Error in Db connection")
    }
    else{
        console.log("Connected to DB")
    }
})

//Routes
app.use('/users',userRouter)
app.use('/products',productRouter);
app.use('/cart',cartRouter);

//dealng with unmatched paths /rendering of page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './build', 'index.html'))
})

const PORT= process.env.port||3000;
app.listen(PORT,()=>{
    console.log("Server listening on port ",PORT)
})