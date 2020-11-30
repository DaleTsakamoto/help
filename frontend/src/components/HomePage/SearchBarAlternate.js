import React, {useState} from 'react'
import { Redirect } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import * as searchActions from '../../store/search'

// import './HomePage.css'

function SearchBarAlternate() {
  const dispatch = useDispatch();
  const [keywordSearch, setKeywordSearch] = useState('')
  const [locationSearch, setLocationSearch] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  

  const activateSearch = () => {
    if (!locationSearch) {
      dispatch(searchActions.localsFind({ keywordSearch }))
        .then(() => setIsLoaded(true))
    } else {
      dispatch(searchActions.localsFindLocation({ keywordSearch, locationSearch }))
        .then(() => {
          setLocationSearch('')
          document.querySelector('.alt-search-bar__location').value = '';
        })
        .then(() => setIsLoaded(true))
    }
  }

  const goRedirect = () => {
    if (isLoaded) {
      return <Redirect
      to={{
      pathname: '/results'
    }} />
    }
  }

  return (
    <div className="alt-search-bar">
      <input
      onChange={(e) => setKeywordSearch(e.target.value)}
      className="alt-search-bar__keyword"
      placeholder="gardening, Julia Smith"
      name="keywordSearch" />
      <input
      onChange={(e) => setLocationSearch(e.target.value)}
      className="alt-search-bar__location"
      placeholder="San Francisco"
      name="locationSearch" />
      <button onClick={activateSearch} className="alt-search-button">
      {goRedirect()}
        <i className="fas fa-search alt-magnify" />
      </button>
    </div>
  )
}

export default SearchBarAlternate;