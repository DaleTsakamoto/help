import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {NavLink, Switch, Route} from 'react-router-dom'

import './Testimony.css';
import * as TestimonyActions from '../../store/testimony'


const Testimony = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.session.user)
  const user = useSelector(state => state.users.person)
  const currentTestimony = useSelector(state => state.testimony.testimony)
  const [isLoaded, setIsLoaded] = useState(false);
  const { id } = user;

  //USE TO GET CORRECT USERPAGE/INFORMATION
  let urlId = parseInt(window.location.pathname.split('/')[2])


  // const tabHide = (e) => {
  //   const ele = document.querySelector('.show');
  //   ele.classList.remove('show')
  //   e.target.parentElement.classList.add('show')
  //   setTaskChange(e.target)
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(TaskActions.taskAdd({ choreType, taskDetails, id })).then(setTaskDetails(''))
  //   return
  // };

  // const alterTask = (e) => {
  //   let taskId = e.target.id
  //   let userId = currentUser.id;
  //   let name;
  //   if (e.target.name) {
  //     name = e.target.name
  //   } else {
  //     name = null
  //   }
  //   dispatch(TaskActions.taskUpdate({ taskId, urlId, name, userId })).then(setTaskId(taskId))
  //   return;
  // };

  useEffect(() => {
    dispatch(TestimonyActions.testimonySearch({
      urlId
    })).then(() => setIsLoaded(true))
  }, [dispatch]);

  let comments;
  if (isLoaded) {
    comments = Object.values(currentTestimony).map((testimony, idx) => {
      return (
        <div className='testimony-individual-container' key={idx}>
          <h1>{testimony.commenterId} </h1>
          <p>{testimony.comment}</p>
        </div>
      )
    })
  }

  return (
    <div className='testimony-container'>
      <h1 className='testimony-header__name'>Testimony</h1>
      <div className='testimony-comments-holder'>{ comments }</div>
        {/* <Route path={`/users/${urlId}/tasks/incomplete`}>
            <div className='tab-content'>
              {currentUser.id === user.id && !currentUser.helpType ?
                <div className='tasks__addTask'>
                  <form onSubmit={handleSubmit}>
                  <label className='tasks__type__choice' htmlFor="type">Type:</label>
                  <select className='tasks-type__selector' id ='type' name="type" onChange={e => setChoreType(e.target.value)}>
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
        </Route> */}
    </div>
  )
}

export default Testimony;