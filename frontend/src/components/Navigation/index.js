import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './Navigation.css'
import ProfileButton from './ProfileButton'
import HomeLogo from './HomeLogo'
import SearchBar from '../SearchBar/index'

const Navigation = ({isLoaded}) => {
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
      <div className="header">
        <HomeLogo />
        <SearchBar />
        <div> {isLoaded && headerNavigation} </div>
      </div>
  );
}

export default Navigation;