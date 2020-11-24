import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {NavLink, Switch, Route} from 'react-router-dom'

import './Tasks.css';
import * as TaskActions from '../../store/tasks'


const Tasks = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const currentTasks = useSelector(state => state.tasks.tasks)
  const [isLoaded, setIsLoaded] = useState(false);
  const { id, helpType } = user;

  useEffect(() => {
    dispatch(TaskActions.search({
      id, helpType
    })).then(() => setIsLoaded(true))
  }, [dispatch]);

  const tabHide = (e) => {
    const ele = document.querySelector('.show');
    ele.classList.remove('show')
    e.target.parentElement.classList.add('show')
  }

  let complete;
  let incomplete;
  if (isLoaded) {
    if (user.helpType) {
      complete = Object.values(currentTasks).map((task, idx) => {
        if (!task.completed) {
          return(
            <div className='task-container__list__completed'>
              <i class="far fa-check-square completed-icon"></i>
              <p>{task.category} - {task.details}</p><br />
            </div>
          )
        }
      })
      incomplete = Object.values(currentTasks).map((task, idx) => {
        if (task.completed) {
          return(
            <div className='task-container__list__incomplete'>
              <input type="checkbox" id={`task${idx}`} name={`task${idx}`} value={`task${idx}`} />
              <label key={idx} htmlFor={`task${idx}`}>{task.category} - {task.details}</label><br />
            </div>
          )
        }
      })
    }
  }

  return isLoaded && (
    <div className='tasks-container'>
      <div className='tabs'>
        <ul className='tab-header'>
          <li className='tab-header__incomplete show'>
            <NavLink onClick={tabHide} className='navlinks' to={`/users/${user.id}/tasks/incomplete`}>
              Incomplete
            </NavLink>
          </li>
          <li className='tab-header__complete'>
            <NavLink onClick={tabHide} className='navlinks' to={`/users/${user.id}/tasks/completed`}>
              Completed
            </NavLink>
          </li>
      </ul>
      <Switch>
        <Route path={`/users/${user.id}/tasks/completed`}>
          <div className='tab-content'>
          {complete}
          </div>
          </Route>
          <Route path={`/users/${user.id}/tasks/incomplete`}>
          <div className='tab-content'>
          {incomplete}
          </div>
        </Route>
      </Switch>
      </div>
    </div>
  )
}

export default Tasks;