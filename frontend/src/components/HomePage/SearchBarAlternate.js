import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import * as searchActions from '../../store/search'

// import './HomePage.css'

function SearchBarAlternate() {
  const history = useHistory()
  const dispatch = useDispatch();
  const [keywordSearch, setKeywordSearch] = useState('')
  const [locationSearch, setLocationSearch] = useState('')

  

  const activateSearch = async () => {
    if (!locationSearch) {
      dispatch(searchActions.localsFind({ keywordSearch }))
      .then(() => {
        setKeywordSearch('')
        document.querySelector('.alt-search-bar__keyword').value = '';
      })
        .then(() => goRedirect())
    } else {
      dispatch(searchActions.localsFindLocation({ keywordSearch, locationSearch }))
        .then(() => {
          setLocationSearch('')
          setKeywordSearch('')
          document.querySelector('.alt-search-bar__location').value = '';
          document.querySelector('.alt-search-bar__keyword').value = '';
        })
        .then(() => goRedirect())
    }
  }


  const goRedirect = () => {
    let path = '/results'
    return history.push(path);
  }

  return (
    <div className="alt-search-bar">
      <input
      onChange={(e) => setKeywordSearch(e.target.value)}
      className="alt-search-bar__keyword"
      placeholder="Dale Sakamoto, demo_helpee"
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