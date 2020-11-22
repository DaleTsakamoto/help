import React, { useState} from 'react'
import { fetch } from '../../store/csrf'

import './SearchBar.css'

function SearchBar() {
  const [keywordSearch, setKeywordSearch] = useState('')
  const [locationSearch, setLocationSearch] = useState('')

  const activateSearch = () => {
    const res = fetch('/search', {
      method: 'POST',
      body: JSON.stringify({
        keywordSearch
      }),
    })
    console.log(res)
    return () => setKeywordSearch('');
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
        <i className="fas fa-search magnify" />
      </button>
    </div>
  )
}

export default SearchBar;