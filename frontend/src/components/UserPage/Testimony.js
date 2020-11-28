import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'


const Testimony = () => {
  const person = useSelector(state => state.users.person)

  return (
    <>
      <h1 className='testimony'>Testimony:</h1>
      <div className='testimony-body'></div>
    </>
  )
}

export default Testimony;