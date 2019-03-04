import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from 'redux-logger'
import axios from 'axios'
import cart from '../components/cart'

// Middlewares
const middlewares = applyMiddleware(loggerMiddleware, thunkMiddleware)

// Initial State
const initialState = []

// Action Types
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_ROW = 'DELETE_ROW'

// Action Creators
const getCart = payload => ({
  type: GET_CART,
  payload
})
const addToCart = payload => ({
  type: ADD_TO_CART,
  payload
})

const deleteRow = payload => ({
  type: DELETE_ROW,
  payload // cartItemId
})

// Thunk Creators
export const getCartTC = userId => async dispatch => {
  try {
    // const res = await axios.get('api/cart/1')
    const res = await axios.get(`api/cart/${userId}`)
    dispatch(getCart(res.data))
  } catch (getCartErr) {
    console.error(getCartErr)
  }
}

// Reducer
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_CART:
      // object into array
      return action.payload
    case DELETE_ROW:
      return cart.filter(item => item.id !== action.payload)
    default:
      return state
  }
}
