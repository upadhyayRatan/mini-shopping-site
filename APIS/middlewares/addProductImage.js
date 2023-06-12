//import cloudinary
const cloudinary1=require("cloudinary").v2
//import multer
const multer=require("multer")
const {CloudinaryStorage}=require("multer-storage-cloudinary")
require("dotenv").config()

//configure cloudinary
cloudinary1.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET

})

//configure cloudinary storage
const cloudinaryStorage=new CloudinaryStorage({
    cloudinary:cloudinary1,
    params:async (req,file) =>{
        return {
            folder:"Grocery-Store",
            pubilc_key: file.fieldname + '-' + Date.now()
        }
    }
})
//configure multer
const multerObj=multer({storage:cloudinaryStorage})
module.exports =multerObj