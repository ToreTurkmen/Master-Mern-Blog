const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

//get all mssg
const getWorkouts = async (req, res) =>{

  const user_id = req.user._id
  const workouts = await Workout.find({user_id}).sort({createdAt: -1})

  res.status(200).json(workouts)
}

//get single mess
const getWorkout = async (req, res) =>{

  const { id } = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No message'})
  }

  const workout = await Workout.findById(id)

  if(!workout) {
    return res.status(404).json({error: 'No message'})
  }

  res.status(200).json(workout)
}




//create new mes
const createWorkout = async (req, res ) =>{
  const {title, load, reps} = req.body

  let emptyFields = []

  if(!title) {
    emptyFields.push('title')
  }
  if(!load) {
    emptyFields.push('load')
  }
  if(!reps) {
    emptyFields.push('reps')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({error: 'Please fill in the all blanks', emptyFields})
  }
  
  //add doc to db
  try {
    const user_id = req.user._id
    const workout = await Workout.create({title, load, reps, user_id})
    res.status(200).json(workout)
  } catch(error){
    res.status(400).json({error: error.message})
  }
}

//delete mes

const deleteWorkout = async (req, res) =>{
  const { id } = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) {
   return res.status(404).json({error: 'No message'})
 }
 const workout = await Workout.findByIdAndDelete({_id: id})

 if(!workout) {
   return res.status(400).json({error: 'No message'})
 }

 res.status(200).json(workout)
}

//update mes
const updateWorkout = async (req, res) =>{
  const { id } = req.params

   if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No message'})
  }
  const workout = await Workout.findByIdAndUpdate({_id: id}, {
   ...req.body
  })
  if(!workout) {
    return res.status(400).json({error: 'No message'})
  }

  res.status(200).json(workout)
}



module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout
  

}