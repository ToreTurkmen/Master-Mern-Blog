import React from 'react'
import { useEffect } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'
//comp
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {

  const {workouts, dispatch} = useWorkoutsContext()

  const {user} = useAuthContext()

  // const [workouts, setWorkouts] =useState(null)

  useEffect(() =>{
    const fetchWorkouts = async () =>{
      const response = await fetch('/api/workouts', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        // setWorkouts(json)
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    }
    if(user) {
      fetchWorkouts()
    }
    
  }, [dispatch, user])


  return (
    <div className='home'>
      <div className="workouts">
        {workouts && workouts.map((workout) =>(
          <WorkoutDetails workout={workout} key={workout._id} />
        ))}
       
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home