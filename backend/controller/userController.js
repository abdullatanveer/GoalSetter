const asyncHandler=require("express-async-handler");
const User=require("../models/userModel");
  

//@desc Register a new user
//@route POST /api/users
//@access Public
const registerUser=asyncHandler(async(req,res)=>{
    
        const {name,email,password}=req.body;
        const user= await User.create({
            name,email,password
        });
        const token=user.getJWTToken();
    
    
        res.status(200).json({
            user,
            success:true,
            token
        });
    

    })
     

//@desc Authenticate a  user
//@route POST /api/users
//@access Public

const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
     
    // checking if user has given password and email both

  if (!email || !password) {
    res.status(401);
    throw new Error("Provide email and pasword")
  }

  const user = await User.findOne({ email });

  if (!user) {
     res.status(404);
     throw new Error("User not found with this email");
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
     res.status(400);
     throw new Error("Password doesnot match")
  }
  const token=user.getJWTToken();

    res.status(200).json({
         token,
         //user,
        success:true,
    })
});

const getUserProfile=asyncHandler(async(req,res)=>{
    const{_id, name ,email}=await User.findById(req.user._id);

    res.status(200).json({
        _id,
        name,
        email
    
    })
});
module.exports={
    registerUser,
    loginUser,
    getUserProfile
}