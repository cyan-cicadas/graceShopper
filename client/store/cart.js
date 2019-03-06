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
const DELETE_ROW = 'DELETE_ROW'
const CHANGE_COUNT = 'CHANGE_COUNT'
const ADD_TO_CART = 'ADD_TO_CART'

// Action Creators
const getCart = payload => ({
  type: GET_CART,
  payload
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
    // const res = await axios.get('api/cart/1')

    const res = await axios.get(`api/cart/${userId}`)

    console.log(res)

    dispatch(getCart(res.data))
  } catch (getCartErr) {
    console.error(getCartErr)
  }
}

function updateCount(array) {}

// Reducer
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_CART:
      return action.payload

    case DELETE_ROW:
      return cart.filter(item => item.id !== action.payload)

    case CHANGE_COUNT:
      const {prodid, type} = action.payload
      console.dir(state)
      const newState = [...state]
      // return state
      return newState.map(el => {
        const {productInfo: item} = el
        // console.log(item)
        if (item.id === prodid && el.quantity > 0) {
          type === '+' ? el.quantity++ : el.quantity--
        }
        return el
      })

    case ADD_TO_CART: {
      const newState = [...state, action.payload]

      return newState
    }

    default:
      return state
  }
}
