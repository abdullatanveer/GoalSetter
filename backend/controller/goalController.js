const asyncHandler = require('express-async-handler');

const Goal=require('../models/goalModel')


//@desc Get all goals
//@route GET /api/goals
//access Public
 const getGoals = asyncHandler(async (req, res) => {
    const goal= await Goal.find();
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
    const goal =await Goal.create({
        text:req.body.text,
    
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

    if(!goal){
        res.status(400);
        throw new Errror("No gola found with this id")
    }
     await goal.deleteOne();

    res.status(200).json({message:`Goal deleted with id ${req.params.id}`})
})





module.exports = {getGoals,setGoal,updateGoal,deleteGoal};