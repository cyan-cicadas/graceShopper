import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from 'redux-logger'
import axios from 'axios'

// Middlewares
const middlewares = applyMiddleware(loggerMiddleware, thunkMiddleware)

// Initial State
const initialState = {
  cart: []
}

// Action Types
const ADD_TO_CART = 'ADD_TO_CART'

// Action Creators
const addToCart = payload => ({
  type: ADD_TO_CART,
  payload
})

// Thunk Creators
export const addToCartTC = data => async dispatch => {
  console.log(data)
  // await axios.post('api/product')
}

// Reducer
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_TO_CART: {
      return {...state, cart: action.payload}
    }
    default:
      return state
  }
}
