import * as action from './actionTypes'
import axios from 'axios'


// export const swapList = (firstID, secondID) => {
//   return dispatch => {

//   }
// }

export const swapTask = (boardID, tasklistID, firstID, secondID = null) => {
  return dispatch => {
    console.log(boardID, tasklistID, firstID, secondID)
    axios.post('http://localhost:8000/api/tasks/reorder', { firstID: firstID, secondID: secondID, tasklistID: tasklistID })
      .then(res => {
        console.log(res)
        dispatch(getLists(boardID))
      })
      .catch(err => {
        console.log(err)
        dispatch(getLists(boardID))
      })
  }
}


export const getBoards = () => {
  return {
    type: action.GET_BOARDS
  }
}

export const createBoard = (payload, id = null) => {
  return {
    type: action.CREATE_BOARD,
    payload: payload,
    boardID: id
  }
}

export const deleteBoard = (id) => {
  return {
    type: action.DELETE_BOARD,
    boardID: id
  }
}

export const getLists = (id) => {
  return dispatch => {
    axios.get(`http://localhost:8000/api/tasklists/${id}`)
      .then(res => {
        dispatch(getListsSuccess(res.data))
      })
      .catch(err => {
        console.log(err)
      })
  }
}
export const getListsSuccess = (lists) => {
  return {
    type: action.GET_LISTS_SUCESS,
    lists: lists
  }
}


export const deleteList = (boardID, listID) => {
  return dispatch => {
    axios.delete(`http://localhost:8000/api/tasklists/${listID}`)
      .then(res => {
        dispatch(getLists(boardID))
      })
      .catch(err => {
        dispatch(getLists(boardID))
      })
  }
}

export const createTask = (boardID, listID, payload, taskID = null) => {
  return dispatch => {
    console.log(boardID, taskID, payload, listID)
    if (taskID) {
      axios.put(`http://localhost:8000/api/tasks/${taskID}`, payload)
        .then(res => {
          console.log(res)
          dispatch(getLists(boardID))
        })
        .catch(err => {
          console.log(err)
          dispatch(getLists(boardID))
        })
    } else {
      axios.post('http://localhost:8000/api/tasks/', { title: payload, task_list: listID })
        .then(res => {
          console.log(res)
          dispatch(getLists(boardID))
        })
        .catch(err => {
          console.log(err)
          dispatch(getLists(boardID))
        })
    }
  }
}

export const deleteTask = (boardID, taskID) => {
  return dispatch => {
    axios.delete(`http://localhost:8000/api/tasks/${taskID}`)
      .then(res => {
        console.log(res)
        dispatch(getLists(boardID))
      })
      .catch(err => {
        console.log(err)
        dispatch(getLists(boardID))
      })
  }
}

export const createList = (boardID, payload, listID = null) => {
  return dispatch => {
    if (listID) {
      axios.put(`http://localhost:8000/api/tasklists/${listID}`, payload)
        .then(res => {
          dispatch(getLists(boardID))
        })
        .catch(err => console.log(err))
    } else {
      axios.post('http://localhost:8000/api/tasklists/', { title: payload, board: boardID })
        .then(res => {
          dispatch(getLists(boardID))
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}