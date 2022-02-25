import counterReducer from './counter'
import isLoggedReducer from './isLogged'
import { combineReducers } from 'redux'
import userReducer from './user';

// combine all reducers
const allReducers = combineReducers({
    counter: counterReducer,
    isLogged: isLoggedReducer,
    user: userReducer
})

export default allReducers;