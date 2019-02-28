import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from 'redux-logger'
import axios from 'axios'

// Initial State
const initialState = {}

// Action Types
const GET_PROD_LIST = 'GET_PROD_LIST'

// Action Creators
const getProdList = payload => ({
  type: GET_PROD_LIST,
  payload
})

// Thunk Creators
export const getProdListTC = () => async dispatch => {
  const res = await axios.get('/api/product')
  dispatch(getProdList(res))
}

// Reducer
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_PROD_LIST:
      console.log(action.payload)
      return {...state, product: action.payload}

    default:
      return state
  }
}
