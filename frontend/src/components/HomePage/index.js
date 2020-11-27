import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './HomePage.css';
import HomeLogoAlternate from './HomeLogoAlternate'
import SearchBarAlternate from './SearchBarAlternate'
import * as usersAction from '../../store/users'

function HomePage() {
  const dispatch = useDispatch()
  const localPeople = useSelector(state => state.users.users)
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
      console.log("dispatch before")
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
      if (countHelpee > 6) return;
      if (!person.user.helpType) {
        countHelpee = countHelpee + 1;
        return (
          <div key={idx} className={`users-container__body__local__helpees__${countHelpee}`}>
            {/* <img src={`https://maps.googleapis.com/maps/api/staticmap?zoom=13&size=400x180&maptype=roadmap
&markers=color:blue%7Clabel:S%7C${person.user.lat},${person.user.lng}&key=${process.env.GOOGLE_API}`} /> */}
            <img src={`https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap
&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318
&markers=color:red%7Clabel:C%7C40.718217,-73.998284
&key=${process.env.GOOGLE_API}`} />
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