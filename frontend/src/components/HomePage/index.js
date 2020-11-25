import React, { useState} from 'react'
import { fetch } from '../../store/csrf'

import './HomePage.css';
import HomeLogoAlternate from './HomeLogoAlternate'
import SearchBarAlternate from './SearchBarAlternate'

function HomePage() {

  

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
            <div className='body-local__user__1'></div>
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