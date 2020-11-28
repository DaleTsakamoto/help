import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Redirect, NavLink, Route } from 'react-router-dom'

import * as sessionActions from '../../store/session';
import { fetch } from '../../store/csrf'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [redirect, setRedirect] = useState(false);


  // const findUser = async () => {
  //   const res = await fetch(`/users/${user.id}`)
  //   return res;
  // }

  // const usersPage = () => {
  //   if (redirect) {
  //     const res = findUser();
  //     console.log(res)
  //     return (
  //       <Redirect to={{
  //         pathname: `/users/${user.id}`,
  //         user: res.data.user
  //       }}/>
  //     )
  //   }
  // }

  // const goUser = () => {
  //   if (redirect) {
  //     <Redirect to={`/users/${user.id}`} />
  //     return setRedirect(false);
  //   }
  // }

  // const useRedirect = () => {
  //   setRedirect(true)
  // }

  // useEffect(() => {
  //   setRedirect(false);
  // }, [redirect])
  
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
    return (
      <Redirect to='/' />
    )
  };


  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-hands-helping"></i>
      </button>
      {showMenu && (
        <div className="profile-dropdown">
          <div className='profile-dropdown__about-me'>
            <i className="fas fa-user"></i>
            <a className='profile-dropdown__link' href={`/users/${user.id}`}>About Me </a>
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