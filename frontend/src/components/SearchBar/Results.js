import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'


const Results = () => {
  const person = useSelector(state => state.users.person)

  return (
    <>
      <h1 className='bio-title'>Results:</h1>
      <div className='bio-body'>{person.bio}</div>
    </>
  )
}

export default Results;