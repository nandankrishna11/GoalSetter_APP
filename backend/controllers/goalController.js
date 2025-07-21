const asyncHandler =require('express-async-handler')
const Goal =require('../model/goalModel')
const User =require('../model/userModel')

//get 
const getGoals =asyncHandler( async(req,res)=>{
    const goals=await Goal.find({user:req.user.id})
   res.json(goals)
})

//post 
const setGoals = asyncHandler(async(req,res)=>{
    if (!req.body.text){
        res.status(400)
        throw new Error('please add a text field')
    }

    const goal =await Goal.create({
        text:req.body.text,
        user:req.user.id,
    })
    res.status(200).json(goal)
})

//put 
const updateGoals = asyncHandler(async(req,res)=>{
    const goal=await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    
    }
    //make sure the logged user matches the goal user
    if(goal.user.toString()!==req.user.id){
        res.status(401)
        throw new Error('You can not update a goal that is not yours')
        }


   const updateGoal = await Goal.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
   }) 
   res.status(200).json(updateGoal)
})


//delete
const deleteGoals = asyncHandler(async(req,res)=>{
    const goal=await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

  
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    
    }
    //make sure the logged user matches the goal user
    if(goal.user.toString()!==req.user.id){
        res.status(401)
        throw new Error('You can not update a goal that is not yours')
        }
    await goal.remove


   res.status(200).json({id:req.params.id})
})



module.exports={getGoals,setGoals,updateGoals,deleteGoals}