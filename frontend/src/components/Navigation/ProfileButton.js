import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import {Redirect, NavLink} from 'react-router-dom'
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const usersPage = () => {
    if (redirect) {
      return (
        <Redirect to='/user' />
      )
    }
  }

  const useRedirect = () => {
    setRedirect(true)
  }

  useEffect(() => {
    setRedirect(false);
  }, [redirect])
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };


  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-hands-helping"></i>
      </button>
      {showMenu && (
        <div className="profile-dropdown">
          <div>
            {usersPage()}
            <i className="fas fa-user"></i>
            <button onClick={useRedirect}> About Me </button>
          </div>
          <div>
            <i className="fas fa-sign-out-alt"></i>
            <button onClick={logout}>Log Out</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;