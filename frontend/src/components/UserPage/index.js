import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import * as taskActions from '../../store/tasks'

import Tasks from '../Tasks'
import { fetch } from '../../store/csrf'
import './UserPage.css'

const UserPage = () => {
  const sessionUser = useSelector(state => state.session.user)
  const [currentUserPage, setCurrentUserPage] = useState()
  // const [tasks, setTasks] = useState([])

  const addClass = (e) => {
    if (!e.target.id) {
      e.target.parentElement.classList.add("user-holder__body__1__selected")
      setCurrentUserPage(e.target.parentElement.id)
    } else {
      e.target.classList.add("user-holder__body__1__selected")
      setCurrentUserPage(e.target.id)
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
    console.log(column2)
  }
  
  // useEffect(() => {
  //   const search = async () => {
  //     // ${currentUserPage}
  //     const res = await fetch(`/api/users/${sessionUser.id}/tasks`, {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         id: sessionUser.id,
  //         helpType: sessionUser.helpType
  //       }),
  //     })
  //     return setTasks(res);
  //   }
  //   search();
  // }, [currentUserPage]);

  // const column2Overview = () => {
    
  //   return (
      
  //   )
  // }


  // useEffect(() => {
  //     const findUser = async () => {
  //       const res = await fetch(`/users/${sessionUser.id}`)
  //       setCurrentUserPage(res.data.user)
  //       return res.data.user
  //     }
  //   findUser()
  // }, [])

  // function success(pos) {
  //   var crd = pos.coords;
  
  //   console.log('Your current position is:');
  //   console.log(`Latitude : ${crd.latitude}`);
  //   console.log(`Longitude: ${crd.longitude}`);
  //   console.log(`More or less ${crd.accuracy} meters.`);
  // }
  
  // function error(err) {
  //   console.warn(`ERROR(${err.code}): ${err.message}`);
  // }

  // navigator.geolocation.getCurrentPosition(success, error)

  // console.log(currentUserPage);
  return (
    <div className="user-holder">
      <div className="user-holder__header">
        <div className='user-holder__header__1'>
          <div className="avatar">
          <i className="far fa-user avatar__image" />
          </div>
        </div>
        <div className='user-holder__header__2'>
          <h1>{sessionUser.firstName} {sessionUser.lastName.slice(0, 1).toUpperCase()}.</h1>
          <h2>Location</h2>
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
          <div className='user-holder__body__1__header'>{sessionUser.firstName}'s Profile</div>
          <div className='user-holder__body__1__parent'>
            <div id='Overview' onClick={addRemoveClass} className='user-holder__body__1__Profile__Overview' >
              <i className="fas fa-user user-holder__body__1__Profile__Overview__icon" />
              <div className='user-holder__body__1__text'> Profile Overview </div>
            </div>
          </div>
          <div className='user-holder__body__1__parent'>
            <div id='Tasks' onClick={addRemoveClass} className='user-holder__body__1__Tasks'>
              <i className="fas fa-tasks user-holder__body__1__Tasks__icon" />
              <div className='user-holder__body__1__text'> Tasks </div>
            </div>
          </div>
          <div className='user-holder__body__1__parent'>
            <div id='Testimonies' onClick={addRemoveClass} className='user-holder__body__1__Testimony'>
              <i className="fas fa-comment-alt user-holder__body__1__Testimony__icon"></i>
              <div className='user-holder__body__1__text'> Testimony </div>
            </div>
          </div>
        </div>
        <div className='user-holder__body__2'><Tasks /></div>
        <div className='user-holder__body__3'>column 3</div>
      </div>
    </div>
  )
}

export default UserPage;