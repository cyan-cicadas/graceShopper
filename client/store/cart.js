import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from 'redux-logger'
import axios from 'axios'
import cart from '../components/cart'
import store from './index'

// Middlewares
const middlewares = applyMiddleware(loggerMiddleware, thunkMiddleware)

// Initial State
const initialState = []

// Action Types
const GET_CART = 'GET_CART'
const DELETE_ROW = 'DELETE_ROW'
const CHANGE_COUNT = 'CHANGE_COUNT'
const ADD_TO_CART = 'ADD_TO_CART'
const CLEAR_CART = 'CLEAR_CART'
// Action Creators
const getCart = payload => ({
  type: GET_CART,
  payload
})

export const clearCart = () => ({
  type: CLEAR_CART
})

export const deleteRow = payload => ({
  type: DELETE_ROW,
  payload // payload === cartItemId
})
export const changeCount = payload => ({
  type: CHANGE_COUNT,
  payload // payload === {id: cartItemId, type: IncreaseOrDecrease}
})

export const addToCart = payload => ({
  type: ADD_TO_CART,
  payload
})

// Thunk Creators
export const getCartTC = userId => async dispatch => {
  try {
    const res = await axios.get(`api/cart/${userId}`)

    dispatch(getCart(res.data))
  } catch (getCartErr) {
    console.error(getCartErr)
  }
}

export const updateCart = payload => async dispatch => {
  try {
    const res = await axios.put(`api/cart/`, payload)

    // dispatch(getCart(res.data))
  } catch (getCartErr) {
    console.error(getCartErr)
  }
}

export const checkoutThunk = payload => async dispatch => {
  try {
    const res = await axios.put(`api/cart/checkout`, payload)

    // dispatch(getCart(res.data))
  } catch (getCartErr) {
    console.error(getCartErr)
  }
}

// Reducer
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_CART:
      return action.payload

    case DELETE_ROW: {
      console.log('delete row payload: ', action.payload)

      return [...state].filter(item => item.productInfo.id !== action.payload)
    }

    case CHANGE_COUNT: {
      const {id, type} = action.payload
      const newState = [...state]

      return newState.map(item => {
        if (item.productInfo.id === id && item.quantity > 0) {
          // console.log('hitting: ', item)
          type === '+' ? item.quantity++ : item.quantity--
        }

        if (item.quantity === 0) {
          // console.log(item.quantity)
          // store.dispatch(deleteRow(id))
        }

        return item
      })
    }

    case ADD_TO_CART: {
      const newState = [...state, action.payload]

      return newState
    }

    case CLEAR_CART: {
      return []
    }

    default:
      return state
  }
}
