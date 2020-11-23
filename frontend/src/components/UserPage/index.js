import React from 'react'
import { useSelector } from 'react-redux'
import './UserPage.css'

const UserPage = () => {
  const sessionUser = useSelector(state => state.session.user)
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
  return (
    <div className="user-holder">
      <div className="user-holder__header">
        <div className='user-holder__header__1'>
          <div className="avatar">
          <i className="far fa-user avatar__image" />
          </div>
        </div>
        <div className='user-holder__header__2'>
          {/* <h1>{sessionUser.firstName} {sessionUser.lastName.slice(0, 1).toUpperCase()}.</h1> */}
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
        <div className='user-holder__body__1'>column 1</div>
        <div className='user-holder__body__2'>column 2</div>
        <div className='user-holder__body__3'>column 3</div>
      </div>
    </div>
  )
}

export default UserPage;