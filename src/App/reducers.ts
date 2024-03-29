import { combineReducers } from 'redux'
import authReducer from 'Data/Auth'
import userReducer from 'Data/User'

const appReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
})

const rootReducer = (state: any, action: any) => {
  if (action.type === 'RESET') {
    state = undefined
  }
  return appReducer(state, action)
}

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer
