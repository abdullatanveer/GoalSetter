const jwt=require("jsonwebtoken");
const asyncHandler=require('express-async-handler');
const user=require('../models/userModel');


const protect=asyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization && 
    req.headers.authorization.startsWith("Bearer"))
    try {

        //Getting token from header
        token=req.headers.authorization.split(' ')[1];
       
        //Verify Token
        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        //Getting user from token
        req.user=await user.findById(decoded.id).select('-password')
        next();
    } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error("Not Aithorixed")
        
    }
    if(!token){
        res.status(401)
        throw new Error("No Token")
    }
})
module.exports={
    protect
}