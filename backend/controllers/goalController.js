const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User =  require('../models/userModel')

//@desc Get goals
//@route Get/api/ goals
//@acess Private
const getGoals =asyncHandler(async(req, res) => {
    const goals = await Goal.find({user: req.user.id})
    res.status(200).json(goals)
})

//@desc set goals
//@route POST/api/ goals
//@acess Private
const setGoals = asyncHandler(async( req, res) => {
   if(!req.body.text){
    res.status(400)
    throw new Error("please add a text field")
   }

   const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id

   })
    res.status(200).json(goal)
    console.log(req.body)
 })

 //@desc update goals
//@route PUT/api/ goals
//@acess Private
 const updateGoals = asyncHandler(async( req, res) => {
    const goal = await Goal.findById(req.params.id)
    //check if goal exist
    if(!goal){
    res.status(400)
    throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)

    //check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the logged in user matches the goal user

    if(goal.user.toString() !==user.id){
        res.status(401)
        throw new Error('user not authorized')
    }
//finding the goal and creating if it doesn't exist
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new:true})

 
    res.status(200).json(updatedGoal)
 })

 //@desc delete goals
//@route DELETE/api/ goals
//@acess Private
 const deleteGoals = asyncHandler(async( req, res) => {
   //const goal = Goal.findByIdAndRemove(req.params.id)
   const user = await User.findById(req.user.id)

   //check for user
   if(!user){
       res.status(401)
       throw new Error('User not found')
   }

   //make sure the logged in user matches the goal user

   if(goal.user.toString() !==user.id){
       res.status(401)
       throw new Error('user not authorized')
   }
   const goal = Goal.findByIdAndRemove(req.params.id)
       
    res.status(200).json({id: req.params.id});
 });
 

module.exports = {
    
    getGoals, 
    setGoals,
    updateGoals,
    deleteGoals
    
}
