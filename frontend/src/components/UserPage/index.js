import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {NavLink, Switch, Route} from 'react-router-dom'

import Location from './Location'
import Tasks from '../Tasks'
import Testimony from './Testimony'
import Overview from './userPageOverview'
import './UserPage.css'
import * as usersAction from '../../store/users'
import * as helpingAction from '../../store/helpingHands'

const UserPage = () => {
  const sessionUser = useSelector(state => state.session.user)
  const person = useSelector(state => state.users.person)
  const [apiKey, setApiKey] = useState('')
  const [hands, setHands] = useState('')
  const [handUpdate, setHandUpdate] = useState(false)
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false);
  const [helpingLoaded, setHelpingLoaded] = useState(false);

  const { id } = sessionUser
  const urlId = window.location.pathname.split('/')[2]

  useEffect(() => {
    dispatch(usersAction.searchPerson(urlId))
      .then((res) => setApiKey(res.data.apiKey))
      .then(() => setIsLoaded(true))
  }, [dispatch])
  
  useEffect(() => {
    dispatch(helpingAction.searchHands(urlId))
      .then((res) => setHands(res.data.allHands))
      .then(() => setHelpingLoaded(true))
  },[dispatch, handUpdate])

  const addClass = (e) => {
    if (!e.target.id) {
      e.target.parentElement.classList.add("user-holder__body__1__selected")
    } else {
      e.target.classList.add("user-holder__body__1__selected")
    }
  }

  const addHands = (e) => {
    if (sessionUser.id !== urlId) {
      setHandUpdate(false)
      dispatch(helpingAction.handAdd({ urlId, id }))
      .then(() => setHandUpdate(true))
    }
  }

  let column2;

  const addRemoveClass = (e) => {
    const value = document.querySelector('.user-holder__body__1__selected')
    if (value) {
      value.classList.remove("user-holder__body__1__selected")
    }
    column2 = addClass(e);
  }

  let helps;
  if (helpingLoaded) {
    if (hands == 0) {
      helps = null
    } else if (hands == 1) {
      helps = "1 Helping Hand"
    } else {
      helps = `${hands} Helping Hands`
    }
  }

  return isLoaded && sessionUser &&(
    <div className="user-holder">
      <div className="user-holder__header">
        <div className='user-holder__header__1'>
          {person.avatar ? 
            <div className="avatar">
              <img className='avatar-image' src={person.avatar}/>
            </div>
           :
          <div className="avatar">
          <i className="far fa-user avatar__temp" />
          </div>
        }
        </div>
        <div className='user-holder__header__2'>
          <h1>{person.firstName} {person.lastName.slice(0, 1).toUpperCase()}.</h1>
          <h2>{person.city}, {person.state}</h2>
          <div className="stats">
            <div className="stats__helping-hands">
              <i onClick={ addHands }className="fas fa-hands-helping stats__helping-hands-icon"></i>
              {helps}
            </div>
            <div className="stats__testimonies">
            <i className="far fa-comment-alt stats__testimonies-icon" />
              3 Testimonies
            </div>
          </div>
        </div>
        <div className='user-holder__header__3'>
          <div className='user-holder__header__3__updates'>
            <div>
            <i className="fas fa-camera user-holder__header__camera"/>Add Profile Photos</div>
            <div>
              <i className="far fa-address-card user-holder__header__update" />Update Your Profile</div>
          </div>
        </div>
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
          <NavLink className="navlinks" to={`/users/${person.id}/testimony`}>
            <div className='user-holder__body__1__parent'>
              <div id='Testimonies' onClick={addRemoveClass} className='user-holder__body__1__Testimony'>
                <i className="fas fa-comment-alt user-holder__body__1__Testimony__icon"></i>
                <div className='user-holder__body__1__text'> Testimony </div>
              </div>
            </div>
          </NavLink>
        </div>
        <div className='user-holder__body__2'>
          <Switch>
            <Route path={`/users/${person.id}/tasks`}>
              <Tasks />
            </Route>
            <Route path={`/users/${person.id}/testimony`}>
              <Testimony />
            </Route>
            <Route path={`/users/${person.id}`}>
              <Overview />
            </Route>
          </Switch>
        </div>
        <div className='user-holder__body__3'><Location apiKey={apiKey}></Location></div>
      </div>
    </div>
  )
}

export default UserPage;