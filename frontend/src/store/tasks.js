import { fetch } from './csrf'

// const SET_USER = 'session/setUser'
// const REMOVE_USER = 'session/removeUser'
const ADD_TASK = 'tasks/addTask'
const REMOVE_TASK = 'tasks/removeTasks'
const FIND_TASKS = 'tasks/findTasks'

const findTasks = (tasks) => {
  return {
    type: FIND_TASKS,
    tasks
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
  const { id, helpType } = user;
  const res = await fetch(`/api/users/${id}/tasks`, {
    method: 'POST',
    body: JSON.stringify({
      id,
      helpType
    }),
  })
  dispatch(findTasks(res.data.tasks));
  return res
}

const initialState = { tasks: null }

const tasksReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case FIND_TASKS:
      newState = Object.assign({}, state)
      newState.tasks = action.tasks;
      return newState;
    default:
      return state;
  }
}

export default tasksReducer;