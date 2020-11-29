import { fetch } from './csrf'

// const SET_USER = 'session/setUser'
// const REMOVE_USER = 'session/removeUser'
const ADD_TASK = 'tasks/addTask'
const UPDATE_TASK = 'tasks/updateTasks'
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

const updateTask = (task) => {
  return {
    type: UPDATE_TASK,
    task,
  }
}

export const taskUpdate = (task) => async (dispatch) => {
  const { taskId, urlId, name, userId } = task
  const res = await fetch(`/api/users/${urlId}/tasks`, {
    method: 'PATCH',
    body: JSON.stringify({
      taskId,
      urlId,
      userId,
      name
    }),
  })
  console.log("THIS IS RES!!!",res)
  dispatch(updateTask(res.data.task));
  return
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
  // console.log("THIS IS RES!!!",res)
  // dispatch(addTask(res.task));
  return
}

export const search = (user) => async (dispatch) => {
  // ${currentUserPage}
  const { urlId } = user;
  const res = await fetch(`/api/users/${urlId}/tasks`, {
    method: 'POST',
    body: JSON.stringify({
      urlId,
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
    case ADD_TASK:
      newState = Object.assign({}, state)
      newState.task = action.task;
      return newState;
    case UPDATE_TASK:
      newState = Object.assign({}, state)
      newState.task = action.task;
      return newState;
    default:
      return state;
  }
}

export default tasksReducer;