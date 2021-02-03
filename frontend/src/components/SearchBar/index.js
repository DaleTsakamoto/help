import React, { useState} from 'react'
import { useHistory } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import * as searchActions from '../../store/search'

import './SearchBar.css'

function SearchBar() {
  const history = useHistory()
  const [keywordSearch, setKeywordSearch] = useState('')
  const [locationSearch, setLocationSearch] = useState('')

  const dispatch = useDispatch();
  

  const activateSearch = async () => {
    if (!locationSearch) {
      dispatch(searchActions.localsFind({ keywordSearch }))
      .then(() => {
        setKeywordSearch('')
        document.querySelector('.search-bar__keyword').value = '';
      })
        .then(() => goRedirect())
    } else {
      dispatch(searchActions.localsFindLocation({ keywordSearch, locationSearch }))
        .then(() => {
          setLocationSearch('')
          setKeywordSearch('')
          document.querySelector('.search-bar__location').value = '';
          document.querySelector('.search-bar__keyword').value = '';
        })
        .then(() => goRedirect())
    }
  }

  const goRedirect = () => {
    let path = '/results'
    return history.push(path);
  }

  return (
    <div className="search-bar">
      <input
      onChange={(e) => setKeywordSearch(e.target.value)}
      className="search-bar__keyword"
      placeholder="Dale Sakamoto, demo_helpee"
      name="keywordSearch" />
      <input
      onChange={(e) => setLocationSearch(e.target.value)}
      className="search-bar__location"
      placeholder="San Francisco"
      name="locationSearch" />
      <button onClick={activateSearch} className="search-button">
        {/* {goRedirect()} */}
        <i className="fas fa-search magnify" />
      </button>
    </div>
  )
}

export default SearchBar;