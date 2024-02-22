const express = require('express');

const router = express.Router();
const {protect}=require("../middleware/authMiddleware")
const{getGoals,setGoal, updateGoal,deleteGoal} = require('../controller/goalController');

router.route('/').get( getGoals).post(setGoal);

router.route('/:id').put(protect,updateGoal).delete(protect,deleteGoal)

module.exports=router;