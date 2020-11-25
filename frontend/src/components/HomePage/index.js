import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetch } from '../../store/csrf'

import './HomePage.css';
import HomeLogoAlternate from './HomeLogoAlternate'
import SearchBarAlternate from './SearchBarAlternate'
import * as usersAction from '../../store/users'

function HomePage() {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const localPeople = useSelector(state => state.users.users)
  const [currentLocation, setCurrentLocation] = useState()
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
        }, () => {
          showError()
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
    }
  }

  useEffect(() => {
      getLocation()
  }, [])
  
  useEffect(() => {
    if (currentLocation) {
      dispatch(usersAction.searchPeople(currentLocation)).then(() => setIsLoaded(true))
    }
  },[currentLocation])
  

  let Helpers;
  let Helpees;
  if (isLoaded) {
    let countHelpee = 0;
    let countHelper = 0;
    Helpees = Object.values(localPeople).map((person, idx) => {
      if (countHelpee > 6) return;
      if (!person.user.helpType) {
        countHelpee = countHelpee + 1;
        return (
          <div key={idx} className={`users-container__body__local__helpees__${countHelpee}`}>
            <div className={`body-local__helpee__${countHelpee}`}>{person.user.firstName}</div>
          </div>
        )
      }
    })
    Helpers = Object.values(localPeople).map((person, idx) => {
      if (countHelper > 6) return;
      if (person.user.helpType) {
        countHelper = countHelper + 1;
        return (
          <div key={idx} className={`users-container__body__local__helpers__${countHelper}`}>
            <div className={`body-local__helpee__${countHelper}`}>{person.user.firstName}</div>
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
        <div className='users-container__body__local'> {Helpees}
        </div>
        <div className='users-container__header__local'>Helpers in Your Area</div>
        <div className='users-container__body__local__2'> {Helpers}
        </div>
      </div>
    </>
  )
}

export default HomePage;