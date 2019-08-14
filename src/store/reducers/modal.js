import * as actionTypes from '../actions/actionTypes'
import { updateObj } from '../helper'

const initialState = {
  modal: false,
}

const openModal = (state, action) => {
  return updateObj(
    state, {
      modal: true
    }
  )
}

const closeModal = (state, action) => {
  return updateObj(
    state, {
      modal: false
    }
  )
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_MODAL: return openModal(state, action);
    case actionTypes.CLOSE_MODAL: return closeModal(state, action);
    default: return state;
  }
}

export default reducer;