import * as actionTypes from '../actions/actionTypes'
import { updateObj } from '../helper'
import axios from 'axios';
const initialState = {
  error: null,
  isAddingList: false,
  isAddingTask: false,
  boards: [],
  lists: [],
}
const getBoards = (state, action) => {
  return updateObj(
    state, {
      boards: action.boards
    }
  )
}


const getListsSuccess = (state, action) => {
  console.log(action)
  return updateObj(
    state, {
      lists: action.lists
    }
  )
}




const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_BOARDS: return getBoards(state, action);
    case actionTypes.GET_LISTS_SUCESS: return getListsSuccess(state, action);
    default: return state;
  }
}

export default reducer;