const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');


const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please enter your name']
    },
    email:{
        type:String,
        required:[true,'Please enter your email'],
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

// hashing the password

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
    next();
    }
    
   this.password=  await bcrypt.hash(this.password,10);
})


// JWT token  
userSchema.methods.getJWTToken = function () {
 return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
   expiresIn: process.env.JWT_EXPIRE,
 });
};

// compare passwords


userSchema.methods.comparePassword = async function(password) {
return await bcrypt.compare(password,this.password)
};

module.exports=mongoose.model('User',userSchema);