import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import './SearchBar.css'


const Results = () => {
  const person = useSelector(state => state.users.person)
  const locals = useSelector(state => state.locals.locals)

  let resultsRender
  if (locals) {
    resultsRender =
      Object.values(locals).map((person, idx) => {
      return (
        <div key={idx} className={`results-container__results__local`}>
        <div className={`results-local__helpee`}>
            <NavLink className='navlinks' to={`/users/${person.id}`}>
              <div className='results-local-header'>
                <img className='results-local-header__image' src={person.avatar} />
                <h1 className='results-local-username'>{person.firstName} {person.lastName.slice(0, 1).toUpperCase()}.</h1>
              </div>
            </NavLink>
            <div className='results-local-user__bio'>{person.bio}</div>
          </div>
        </div>
      )
    })
  } else {
    resultsRender = <div className='no-results-found'> No Results Found </div>
  }
  return (
    <div>
      <h1 className='results-title'>Results:</h1>
      <div className='users-container__body__local'>{resultsRender}</div>
    </div>
  )
}

export default Results;
