import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import * as TaskActions from '../../store/tasks'


const Tasks = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const [tasks, setTasks] = useState([])
  const { id, helpType } = user;

  const findTasks = async() => {
    return dispatch(TaskActions.search({
      id, helpType
    }))
  }
  findTasks();


  const currentTasks = useSelector(state => state)
  console.log(currentTasks)


  return (
      <div>THESE ARE MY TASKS!!!</div>
  )
}

export default Tasks;