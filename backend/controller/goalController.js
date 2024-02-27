const asyncHandler = require('express-async-handler');

const Goal=require('../models/goalModel')


//@desc Get all goals
//@route GET /api/goals
//access Public
 const getGoals = asyncHandler(async (req, res) => {
    const goal= await Goal.find({user:req.user._id});
    res.status(200).json(goal);

});

//@desc set goal
//@route POST /api/goals
//access Private
 const setGoal = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400);
        throw new Error('Invalid data');
    }
    if(!req.body.user){

    res.status(401);
    throw new Error('Not Authorized');
    }
    const goal =await Goal.create({
        text:req.body.text,
        user:req.user._id
    
    })
    res.status(200).json(goal);
});

//@desc set goal
//@route PUT /api/goals
//access Private

const updateGoal=asyncHandler( async (req,res)=>{
    const goal= await Goal.findById(req.params.id);

    if(!goal){
        res.status(400);
        throw new Errror("No gola found with this id")
    }
    const updatedGoal=await Goal.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        
    
    })
    res.status(200).json( updatedGoal);
})

const deleteGoal=asyncHandler(async (req,res)=>{
    const goal= await Goal.findById(req.params.id);
    console.log(goal.user);

    if(!goal){
        res.status(400);
        throw new Errror("No gola found with this id")
    }
    if(!req.user){
        res.status(401);
        throw new Error("Not Authorized")
    
    }
    // console.log(goal.user);
    // if(goal.user.toString() !==req.user._id.toString()){
    //     res.status(401);
    //     throw new Error("Not Authorized")
    // }
     await goal.deleteOne();

    res.status(200).json({message:`Goal deleted with id ${req.params.id}`})
})





module.exports = {getGoals,setGoal,updateGoal,deleteGoal};