import React, { useState} from 'react'
import { fetch } from '../../store/csrf'

import './HomePage.css';
import HomeLogo from '../Navigation/HomeLogo'
import SearchBar from '../SearchBar'

function HomePage() {

  return (
    <>
      <div className='home-page-main-image'>
        <HomeLogo />
        <SearchBar />
      </div>
      <div>Hello!</div>
    </>
  )
}

export default HomePage;