import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProfileButton from './ProfileButton'
import './Navigation.css'

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
    <ul>
      <li>
        <NavLink exact to="/">Home</NavLink>
        {isLoaded && headerNavigation}
      </li>
    </ul>
  );
}

export default Navigation;