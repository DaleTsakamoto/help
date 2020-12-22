import React, { useEffect, useState} from 'react'
import { Redirect, Route } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import * as searchActions from '../../store/search'

import './SearchBar.css'

function SearchBar() {
  const [keywordSearch, setKeywordSearch] = useState('')
  const [locationSearch, setLocationSearch] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  const dispatch = useDispatch();
  

  const activateSearch = async () => {
    if (!locationSearch) {
      dispatch(searchActions.localsFind({ keywordSearch }))
        .then(() => setIsLoaded(true))
    } else {
      dispatch(searchActions.localsFindLocation({ keywordSearch, locationSearch }))
        .then(() => {
          setLocationSearch('')
          document.querySelector('.search-bar__location').value = '';
        })
        .then(() => setIsLoaded(true))
    }
  }

  const goRedirect = () => {
    if (isLoaded) {
      return <Redirect exact to='/results'/>
    }
  }

  return (
    <div className="search-bar">
      <input
      onChange={(e) => setKeywordSearch(e.target.value)}
      className="search-bar__keyword"
      placeholder="gardening, Julia Smith"
      name="keywordSearch" />
      <input
      onChange={(e) => setLocationSearch(e.target.value)}
      className="search-bar__location"
      placeholder="San Francisco"
      name="locationSearch" />
      <button onClick={activateSearch} className="search-button">
        {goRedirect()}
        <i className="fas fa-search magnify" />
      </button>
    </div>
  )
}

export default SearchBar;