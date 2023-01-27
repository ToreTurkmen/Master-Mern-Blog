const express = require('express')

const {
  createWorkout, 
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout
  
} = require('../controllers/workoutController')

const router = express.Router()


//get all mssg
router.get('/', getWorkouts)


//get single mssg
router.get('/:id', getWorkout)


//get new  mssg
router.post('/', createWorkout)


//get delete mssg
router.delete('/:id', deleteWorkout)


//get update mssg
router.patch('/:id', updateWorkout)

module.exports = router