import { fetch } from './csrf'

// const SET_USER = 'session/setUser'
// const REMOVE_USER = 'session/removeUser'
const FIND_USERS = 'tasks/findUsers'

const findUsers = (users) => {
  return {
    type: FIND_USERS,
    users
  }
}

// const setUser = (user) => {
//   return {
//     type: SET_USER,
//     user,
//   }
// }

// const removeUser = () => {
//   return {
//     type: REMOVE_USER,
//   };
// };

export const search = (user) => async (dispatch) => {
  // ${currentUserPage}
  const { id } = user;
  const res = await fetch(`/api/people`, {
    method: 'POST',
    body: JSON.stringify({
      id
    }),
  })
  dispatch(findUsers(res.data.users));
  return res
}

const initialState = { people: null }

const usersReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case FIND_USERS:
      newState = Object.assign({}, state)
      newState.users = action.users;
      return newState;
    default:
      return state;
  }
}

export default usersReducer;