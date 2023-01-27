import { WorkoutsContext } from "../context/WorkoutContext";

import { useContext } from "react";

export const useWorkoutsContext = () =>{

  const context = useContext(WorkoutsContext)

  if(!context) {
    throw Error('must be include 12 char')
  }

  return context
}