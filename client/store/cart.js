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
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'

// Action Creators
const getCart = payload => ({
  type: GET_CART,
  payload
})
const addToCart = payload => ({
  type: ADD_TO_CART,
  payload
})

// Thunk Creators
export const getCartTC = userId => async dispatch => {
  try {
    // const cart = await axios.get('api/cart/1')
    const {cart: data} = await axios.get(`api/cart/${userId}`)
    dispatch(getCart(cart))
  } catch (getCartErr) {
    console.error(getCartErr)
  }
}

// Reducer
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_CART:
      return action.payload
    default:
      return state
  }
}
