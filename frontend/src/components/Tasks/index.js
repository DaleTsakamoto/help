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
  const [taskDetails, setTaskDetails] = useState('')
  const [currentHelpType, setCurrentHelpType] = useState()
  const [taskId, setTaskId] = useState()
  const [choreType, setChoreType] = useState('House Chores')
  const { id, helpType } = user;

  //USE TO GET CORRECT USERPAGE/INFORMATION
  let urlId = parseInt(window.location.pathname.split('/')[2])


  const tabHide = (e) => {
    const ele = document.querySelector('.show');
    ele.classList.remove('show')
    e.target.parentElement.classList.add('show')
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(TaskActions.taskAdd({ choreType, taskDetails, id })).then(setTaskDetails(''))
    return
  };

  const alterTask = (e) => {
    setTaskId(e.target.id)
    dispatch(TaskActions.taskUpdate({ taskId, urlId })).then(setTaskId())
    return;
  };

  useEffect(() => {
    dispatch(TaskActions.search({
      urlId
    })).then((res) => setCurrentHelpType(res.data.helpType)).then(() => setIsLoaded(true))
  }, [dispatch, taskDetails, taskId, helpType, id]);

  let complete;
  let incomplete;
  if (isLoaded) {
    complete = Object.values(currentTasks).map((task, idx) => {
        if (task.completed) {
          return(
            <div className='task-container__list__completed' key={idx}>
              <i className="far fa-check-square completed-icon"></i>
              <p>{task.category} - {task.details}</p><br />
            </div>
          )
        }
      })
      incomplete = Object.values(currentTasks).map((task, idx) => {
        if (id === urlId && !currentHelpType && !task.completed) {
          return (
            <div className='task-container__list__incomplete' key={idx}>
              <div className="tasks__checkbox" key={idx}>{task.category} - {task.details}</div><br />
            </div>
          )
        } else if (!task.completed && currentHelpType) {
          return(
            <div className='task-container__list__incomplete' key={idx}>
              <input type="checkbox" id={task.id} name={task.id} onClick={alterTask} />
              <label className="tasks__checkbox" key={task.id} htmlFor={task.id}>{task.category} - {task.details}</label><br />
            </div>
          )
        } else {
          return(
            <div className='task-container__list__incomplete' key={idx}>
              <i className="fas fa-hands-helping tasks__helping-hands-icon"></i>
              <div className="tasks__checkbox" key={idx} htmlFor={`task${idx}`}>{task.category} - {task.details}</div><br />
            </div>
          )
        }
      })
  }

  return isLoaded && (
    <div className='tasks-container'>
      <div className='tabs'>
        <h1 className='tabs-header__name'>Tasks</h1>
        <ul className='tab-header'>
          <li className='tab-header__incomplete show'>
            <NavLink onClick={tabHide} className='navlinks' to={`/users/${urlId}/tasks/incomplete`}>
              Incomplete
            </NavLink>
          </li>
          <li className='tab-header__complete'>
            <NavLink onClick={tabHide} className='navlinks' to={`/users/${urlId}/tasks/completed`}>
              Completed
            </NavLink>
          </li>
      </ul>
      <Switch>
        <Route path={`/users/${urlId}/tasks/completed`}>
          <div className='tab-content'>
          {complete}
          </div>
          </Route>
        <Route path={`/users/${urlId}/tasks/incomplete`}>
            <div className='tab-content'>
              {id === urlId && !helpType ?
                <div className='tasks__addTask'>
                  <form onSubmit={handleSubmit}>
                  <label className='tasks__type__choice' htmlFor="type">Type:</label>
                  <select id ='type' name="type" onChange={e => setChoreType(e.target.value)}>
                    <option value='House Chores' required>House Chores</option>
                    <option value='Yard Work' required>Yard Work</option>
                    <option value='Grocery Shopping' required>Grocery Shopping</option>
                    <option value='Other' required>Other</option>
                  </select>
                  <input className='tasks__addTask__input'
                    value={taskDetails}
                    type='text'
                    onChange={ e => setTaskDetails(e.target.value) }
                    required
                    placeholder='I need help with...' />
                    <input className='tasks__hidden-submit' type="submit" />
                  </form>
                </div> : null}
              {incomplete}
            </div>
        </Route>
      </Switch>
      </div>
    </div>
  )
}

export default Tasks;