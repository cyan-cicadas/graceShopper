import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import userReducer from './user'
import productReducer from './product'
import cartReducer from './cart'

// Persistent State via Local Storage:::
const writeToLocalStorage = state => {
  try {
    const serielizedState = JSON.stringify(state)
    localStorage.setItem('state', serielizedState)
  } catch (writeStateErr) {
    console.error(writeStateErr)
  }
}

const readLocalStorage = () => {
  try {
    const serielizedState = localStorage.getItem('state')
    if (serielizedState === null) return undefined
    return JSON.parse(serielizedState)
  } catch (readLocalErr) {
    console.error(readLocalErr)
    return undefined
  }
}

const persistedState = readLocalStorage()

const reducer = combineReducers({userReducer, productReducer, cartReducer})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, persistedState, middleware)

store.subscribe(() => writeToLocalStorage(store.getState()))

export default store
export * from './user'
