import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {NavLink} from 'react-router-dom'

import './HomePage.css';
import HomeLogoAlternate from './HomeLogoAlternate'
import SearchBarAlternate from './SearchBarAlternate'
import * as usersAction from '../../store/users'

function HomePage() {
  const dispatch = useDispatch()
  const localPeople = useSelector(state => state.users.users)
  const sessionUser = useSelector(state => state.session.user);
  const [currentLocation, setCurrentLocation] = useState()
  const [people, setPeople] = useState([])
  const [isLoaded, setIsLoaded] = useState(false);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(pos)
        }, (err) => {
          showError(err)
        })
    } else {
      alert("Try another browser for geolocation services")
    }
  }
  
  function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert("You must allow location services to use this app")
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.")
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.")
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.")
        break;
      default:
        break;
    }
  }

  useEffect(() => {
      getLocation()
  }, [])
  
  useEffect(() => {
    if (currentLocation) {
      dispatch(usersAction.searchPeople(currentLocation))
        .then((res) => setPeople(res))
        .then(() => setIsLoaded(true))
    }
  },[dispatch, currentLocation])
  

  let Helpers;
  let Helpees;
  if (isLoaded) {
    let countHelpee = 0;
    let countHelper = 0;
    Helpees = Object.values(localPeople).map((person, idx) => {
      if (countHelpee > 5) return;
      if (!person.user.helpType) {
        countHelpee = countHelpee + 1;
        return (
          <div key={idx} className={`users-container__body__local__helpees__${countHelpee}`}>
            <div className={`body-local__helpee__${countHelpee}`}>
              <NavLink className='navlinks' to={`/users/${person.user.id}`}>
              <div className='body-local-header'>
                  <img className='body-local-header__image' src={person.user.avatar}/>
                  <h1 className='body-local-username'>{person.user.firstName} {person.user.lastName.slice(0, 1).toUpperCase()}.</h1>
              </div>
                </NavLink>
              <img src={`https://maps.googleapis.com/maps/api/staticmap?zoom=13&size=300x180&maptype=roadmap
              &markers=color:blue%7Clabel:S%7C${person.user.lat},${person.user.lng}&key=${people.data.apiKey}`} />
              <div className='body-local-user__bio'>{person.user.bio}</div>
            </div>
          </div>
        )
      }
    })
    Helpers = Object.values(localPeople).map((person, idx) => {
      if (countHelper > 5) return;
      if (person.user.helpType) {
        countHelper = countHelper + 1;
        return (
          <div key={idx} className={`users-container__body__local__helpers__${countHelper}`}>
            <div className={`body-local__helpee__${countHelpee}`}>
            <NavLink className='navlinks' to={`/users/${person.user.id}`}>
              <div className='body-local-header'>
                <img className='body-local-header__image' src={person.user.avatar}/>
                <h1 className='body-local-username'>{person.user.firstName} {person.user.lastName.slice(0, 1).toUpperCase()}.</h1>
                </div>
              </NavLink>
              <img src={`https://maps.googleapis.com/maps/api/staticmap?zoom=13&size=300x180&maptype=roadmap
              &markers=color:blue%7Clabel:S%7C${person.user.lat},${person.user.lng}&key=${people.data.apiKey}`} />
              <div className='body-local-user__bio'>{person.user.bio}</div>
            </div>
          </div>
        )
      }
      })
  }

  return (
    <>
      <div className='home-page-main-image'>
        <HomeLogoAlternate />
        <SearchBarAlternate />
      </div>
      <div className='homepage-users-container__local'>
        <div className='users-container__header__local'>Help in Your Area</div>
        <div className='users-container__body__local'> {sessionUser ? Helpees : null}
        </div>
        <div className='users-container__header__local'>Helpers in Your Area</div>
        <div className='users-container__body__local__2'> {sessionUser ? Helpers : null}
        </div>
        <footer>
            <a className='navlink-to-github' href='https://github.com/DaleTsakamoto'>
              <img className='github-image'src='/images/github-logo.png' />
              <div>Learn more about me</div>
            </a>
        </footer>
      </div>
    </>
  )
}

export default HomePage;