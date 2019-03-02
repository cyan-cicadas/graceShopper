import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from 'redux-logger'
import axios from 'axios'

// Middlewares
const middlewares = applyMiddleware(loggerMiddleware, thunkMiddleware)

// Initial State
const initialState = {
  product: [],
  cart: 0
}

// Action Types
const GET_PROD_LIST = 'GET_PROD_LIST'
const ADD_PROD_CART = 'ADD_PROD_CART'

// Action Creators
const getProdList = payload => ({
  type: GET_PROD_LIST,
  payload
})

const addProdCart = payload => ({
  type: ADD_PROD_CART,
  payload
})

// Thunk Creators
export const getProdListTC = () => async dispatch => {
  const {data} = await axios.get('/api/product')
  dispatch(getProdList(data))
}

export const addProdCartTC = data => async dispatch => {
  console.log(data)
  // await axios.post('api/product')
}

// Reducer
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_PROD_LIST: {
      return {...state, product: action.payload}
    }
    case ADD_PROD_CART: {
      return {...state, cart: action.payload}
    }
    default:
      return state
  }
}
