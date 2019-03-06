import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const ADD_CART = 'ADD_CART'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const addCart = id => ({
  type: ADD_CART,
  id
})

/*
 * THUNK CREATORS
*/

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')

    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (
  email,
  password,
  method,
  firstName,
  lastName
) => async dispatch => {
  let data
  try {
    const res = await axios.post(`/auth/${method}`, {
      email,
      password,
      firstName,
      lastName
    })
    data = res.data
    dispatch(getUser(data))
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }
  try {
    dispatch(getUser(data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
  try {
    await axios.post('/api/order', {id: data.id})
  } catch (createCartErr) {
    console.error(createCartErr)
  }

  // try {
  //   const {cartArr: data} = await axios.get(`/api/cart/${data.id}`)
  //   console.log(cartArr)
  // } catch (createCartErr) {
  //   console.error(createCartErr)
  // }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/home')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user

    case REMOVE_USER:
      return defaultUser

    default:
      return state
  }
}
