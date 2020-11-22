import React, {useState} from 'react'

import './SearchBar.css'

function SearchBar() {
  const [keywordSearch, setKeywordSearch] = useState('')
  const [locationSearch, setLocationSearch] = useState('')

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
      placeholder="San Fransisco"
      name="locationSearch" />
      <button>
        <i className="fas fa-hands-helping" />
      </button>
    </div>
  )
}

export default SearchBar;