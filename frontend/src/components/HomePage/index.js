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
  const [currentLocation, setCurrentLocation ] = useState()

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
      console.log("YAYYYYY!!!!!!", currentLocation)
      return dispatch(usersAction.searchPeople(currentLocation))
    }
  },[currentLocation])
  

  return (
    <>
      <div className='home-page-main-image'>
        <HomeLogoAlternate />
        <SearchBarAlternate />
      </div>
      <div className='homepage-users-container__local'>
        <div className='users-container__header__local'>Help in Your Area</div>
        <div className='users-container__body__local'>
          <div className='users-container__body__local__users'>
            <div className='body-local__user__1'>
            </div>
          </div>
          <div className='users-container__body__local__users'>
            <div className='body-local__user__2'></div>
          </div>
          <div className='users-container__body__local__users'>
            <div className='body-local__user__3'></div>
          </div>
          <div className='users-container__body__local__users'>
            <div className='body-local__user__4'></div>
          </div>
          <div className='users-container__body__local__users'>
            <div className='body-local__user__5'></div>
          </div>
          <div className='users-container__body__local__users'>
            <div className='body-local__user__6'></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage;