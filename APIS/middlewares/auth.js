let jwt = require("jsonwebtoken");

const auth = (req,res,next)=>{
    try{
        const token=req.header('Authorization').replace('Bearer ','')
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
        next()
    }catch(e){
        res.status(401).send({error:"Validation required, Session expired login again to required."});
    }
}

module.exports= auth;