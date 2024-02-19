const asyncHandler=require("express-async-handler");
const User=require("../models/userModel");

const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body;
    const user= await User.create({
        name,email,password
    });

    res.status(200).json(user)
});
module.exports={
    registerUser
}