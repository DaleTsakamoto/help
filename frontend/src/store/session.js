import { fetch } from './csrf'
import NodeGeocoder from 'node-geocoder'

async function geocodeAddress (address) {
  const options = {
    provider: 'google',
    apiKey: process.env.GOOGLE_API,
    formatter: null
  };
  
  const geocoder = NodeGeocoder(options);
  
  const result = await geocoder.geocode(address);
  return { lat: result[0].latitude, lng: result[0].longitude}

}

const SET_USER = 'session/setUser'
const REMOVE_USER = 'session/removeUser'

const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  }
}

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const res = await fetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  })
  dispatch(setUser(res.data.user))
  return res;
}

export const signup = (user) => async (dispatch) => {
  const { email, username, password, firstName, lastName, helpType, address, city, state, zipCode } = user;
  const formatAddress = `${address}, ${city}, ${state}, ${zipCode}`
  const { lat, lng } = geocodeAddress(formatAddress)
  const res = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      email,
      username,
      password,
      firstName,
      lastName,
      helpType,
      address,
      city,
      state,
      zipCode,
      lat,
      lng
    }),
  })
  dispatch(setUser(res.data.user))
  return res;
}

export const logout = () => async (dispatch) => {
  const res = await fetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return res;
};

const initialState = { user:null }

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.user;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export const restoreUser = () => async dispatch => {
  const res = await fetch('/api/session');
  dispatch(setUser(res.data.user));
  return res;
};

export default sessionReducer;