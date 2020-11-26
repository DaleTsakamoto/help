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

const addTask = (task) => {
  return {
    type: ADD_TASK,
    task,
  }
}

export const taskAdd = (task) => async (dispatch) => {
  // ${currentUserPage}
  const { choreType, taskDetails, id } = task;
  const res = await fetch(`/api/users/${id}/tasks/add`, {
    method: 'POST',
    body: JSON.stringify({
      choreType,
      taskDetails,
      id
    }),
  })
  console.log("THIS IS RES!!!", res.data)
  dispatch(addTask(res.task));
  return res
}

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
  // dispatch(findTasks(res.data.tasks));
  return
}

const initialState = { tasks: null }

const tasksReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case FIND_TASKS:
      newState = Object.assign({}, state)
      newState.tasks = action.tasks;
      return newState;
    case ADD_TASK:
      newState = Object.assign({}, state)
      newState.tasks = action.task;
      return newState;
    default:
      return state;
  }
}

export default tasksReducer;