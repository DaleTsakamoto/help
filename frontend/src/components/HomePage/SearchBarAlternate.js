import React, { useState} from 'react'
import { fetch } from '../../store/csrf'

import './HomePage.css'

function SearchBarAlternate() {
  const [keywordSearch, setKeywordSearch] = useState('')
  const [locationSearch, setLocationSearch] = useState('')

  const activateSearch = async () => {
    const res = await fetch('/api/search', {
      method: 'POST',
      body: JSON.stringify({
        keywordSearch
      }),
    })
    console.log(res)
    return () => setKeywordSearch('');
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
        <i className="fas fa-search alt-magnify" />
      </button>
    </div>
  )
}

export default SearchBarAlternate;