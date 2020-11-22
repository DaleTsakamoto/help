import React, { useState, useEffect } from "react";
import {NavLink} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function HomeLogo () {

  return (
    <div>
      <img />
      <i className="fas fa-hands-helping"></i>
      <div> Help</div>
    </div>
  )
}

export default HomeLogo;