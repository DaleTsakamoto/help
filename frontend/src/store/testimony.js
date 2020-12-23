import { fetch } from './csrf'

const ADD_TESTIMONY = 'testimony/addTestimony'
const UPDATE_TESTIMONY = 'testimony/updateTestimony'
const FIND_TESTIMONY = 'testimony/findTestimony'
const DELETE_TESTIMONY = 'testimony/deleteTestimony'

const findTestimony = (testimony) => {
  return {
    type: FIND_TESTIMONY,
    testimony
  }
}

const addTestimony = (testimony) => {
  return {
    type: ADD_TESTIMONY,
    testimony,
  }
}

const updateTestimony = (testimony) => {
  return {
    type: UPDATE_TESTIMONY,
    testimony,
  }
}

const deleteTestimony = () => {
  return {
    type: DELETE_TESTIMONY,
  }
}

export const testimonyUpdate = (test) => async (dispatch) => {
  const { primaryKey, comment } = test
  const res = await fetch(`/api/testimony/`, {
    method: 'PATCH',
    body: JSON.stringify({
      primaryKey,
      comment
    }),
  })
  dispatch(updateTestimony(res.data.testimony));
  return res
}

export const testimonyDelete = (id) => async (dispatch) => {
  const res = await fetch(`/api/testimony/${id}`, {
    method: 'DELETE',
  })
  dispatch(deleteTestimony(res.data.testimony));
  return res
}

export const testimonyAdd = (test) => async (dispatch) => {
  const { userId, commenterId, comment } = test;
  const res = await fetch(`/api/testimony/`, {
    method: 'POST',
    body: JSON.stringify({
      userId,
      commenterId,
      comment
    }),
  })
  console.log("THIS IS RESSS!!!!!!!!!!!!!!!", res.data)
  dispatch(addTestimony(res.data.testimony));
  return res
}

export const testimonySearch = (id) => async (dispatch) => {
  const {userId} = id
  console.log("IS THIS THE CORRECTID????????", userId)
  const res = await fetch(`/api/testimony/${userId}`, {
    method: 'GET',
  })
  dispatch(findTestimony(res.data.testimony));
  return res
}

const initialState = { testimony: null }

const testimonyReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case FIND_TESTIMONY:
      newState = Object.assign({}, state)
      newState.testimony = action.testimony;
      return newState;
    case ADD_TESTIMONY:
      newState = Object.assign({}, state)
      // newState.task = action.task;
      return newState;
    case UPDATE_TESTIMONY:
      newState = Object.assign({}, state)
      newState.testimony = action.testimony;
      return newState;
    case DELETE_TESTIMONY:
      newState = Object.assign({}, state)
    default:
      return state;
  }
}

export default testimonyReducer;