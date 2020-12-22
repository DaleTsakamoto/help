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

export const testimonyUpdate = (task) => async (dispatch) => {
  const { taskId, urlId, name, userId } = task
  const res = await fetch(`/api/testimony/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      taskId,
      urlId,
      userId,
      name
    }),
  })
  dispatch(updateTestimony(res.data.testimony));
  return res
}

export const testimonyDelete = (task) => async (dispatch) => {
  const { taskId, urlId, name, userId } = task
  const res = await fetch(`/api/testimony/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({
      taskId,
      urlId,
      userId,
      name
    }),
  })
  dispatch(deleteTestimony(res.data.testimony));
  return res
}

export const testimonyAdd = (task) => async (dispatch) => {
  const { choreType, taskDetails, id } = task;
  const res = await fetch(`/api/testimony`, {
    method: 'POST',
    body: JSON.stringify({
      choreType,
      taskDetails,
      id
    }),
  })
  dispatch(addTestimony(res.data.testimony));
  return res
}

export const testimonySearch = (user) => async (dispatch) => {
  const { urlId } = user;
  const res = await fetch(`/api/testimony`, {
    method: 'GET',
    body: JSON.stringify({
      urlId,
    }),
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