import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {NavLink, Switch, Route} from 'react-router-dom'

import Tasks from '../Tasks'
import Overview from './userPageOverview'
import './UserPage.css'
import * as usersAction from '../../store/users'

const UserPage = () => {
  const sessionUser = useSelector(state => state.session.user)
  const person = useSelector(state => state.users.person)
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false);

  //USE TO GET CORRECT USERPAGE/INFORMATION
  const urlId = window.location.pathname.split('/')[2]
  console.log(urlId)

  useEffect(() => {
      dispatch(usersAction.searchPerson(urlId)).then(() => setIsLoaded(true))
  },[dispatch])

  const addClass = (e) => {
    if (!e.target.id) {
      e.target.parentElement.classList.add("user-holder__body__1__selected")
      // setCurrentUserPage(e.target.parentElement.id)
    } else {
      e.target.classList.add("user-holder__body__1__selected")
      // setCurrentUserPage(e.target.id)
    }
    // console.log(currentUserPage)
  }

  let column2;

  const addRemoveClass = (e) => {
    const value = document.querySelector('.user-holder__body__1__selected')
    if (value) {
      value.classList.remove("user-holder__body__1__selected")
    }
    column2 = addClass(e);
  }

  return isLoaded && (
    <div className="user-holder">
      <div className="user-holder__header">
        <div className='user-holder__header__1'>
          <div className="avatar">
          <i className="far fa-user avatar__image" />
          </div>
        </div>
        <div className='user-holder__header__2'>
          <h1>{person.firstName} {person.lastName.slice(0, 1).toUpperCase()}.</h1>
          <h2>{person.city}, {person.state}</h2>
          <div className="stats">
            <div className="stats__helping-hands">
              <i className="fas fa-hands-helping stats__helping-hands-icon"></i>
              2 Helping Hands
            </div>
            <div className="stats__testimonies">
            <i className="far fa-comment-alt stats__testimonies-icon" />
              3 Testimonies
            </div>
          </div>
        </div>
        <div className='user-holder__header__3'>column 3</div>
      </div>
      <div className="user-holder__body">
        <div className='user-holder__body__1'>
          <div className='user-holder__body__1__header'>{person.firstName}'s Profile</div>
          <NavLink className="navlinks" to={`/users/${person.id}`}>
          <div className='user-holder__body__1__parent'>
            <div id='Overview' onClick={addRemoveClass} className='user-holder__body__1__Profile__Overview' >
              <i className="fas fa-user user-holder__body__1__Profile__Overview__icon" />
              <div className='user-holder__body__1__text'> Profile Overview </div>
            </div>
          </div>
          </NavLink>
          <NavLink className="navlinks" to={`/users/${person.id}/tasks`}>
            <div className='user-holder__body__1__parent'>
              <div id='Tasks' onClick={addRemoveClass} className='user-holder__body__1__Tasks'>
                <i className="fas fa-tasks user-holder__body__1__Tasks__icon" />
                <div className='user-holder__body__1__text'> Tasks </div>
              </div>
            </div>
          </NavLink>
          <div className='user-holder__body__1__parent'>
            <div id='Testimonies' onClick={addRemoveClass} className='user-holder__body__1__Testimony'>
              <i className="fas fa-comment-alt user-holder__body__1__Testimony__icon"></i>
              <div className='user-holder__body__1__text'> Testimony </div>
            </div>
          </div>
        </div>
        <div className='user-holder__body__2'>
          <Switch>
            <Route path={`/users/${person.id}/tasks`}>
              <Tasks />
            </Route>
            <Route path={`/users/${person.id}`}>
              <Overview />
            </Route>
          </Switch>
        </div>
        <div className='user-holder__body__3'>column 3</div>
      </div>
    </div>
  )
}

export default UserPage;

//nest routes with a switch, use location or use history