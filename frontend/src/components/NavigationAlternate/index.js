import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './NavigationAlternate.css'
import ProfileButton from '../Navigation/ProfileButton'

const NavigationAlternate = ({isLoaded}) => {
  const userSession = useSelector(state => state.session.user)
  
  let headerNavigation;
  if (userSession) {
    headerNavigation = ( <ProfileButton user={userSession}/>
    )
  } else {
    headerNavigation = (
      <>
        <NavLink to="/login">
          Login
        </NavLink>
        <NavLink to="/signup">
          Sign up
        </NavLink>
      </>
    )
  }

  return (
      <div className="alt-header">
        <div className="alt-header-testimony">Write a Testimony</div>
        <div className="alt-profile-drop"> {isLoaded && headerNavigation} </div>
      </div>
  );
}

export default NavigationAlternate;