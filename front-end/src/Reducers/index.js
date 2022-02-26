import counterReducer from './counter'
import isLoggedReducer from './isLogged'
import { combineReducers } from 'redux'
import userReducer from './user';
import receiptReducer from './receipt';

// combine all reducers
const allReducers = combineReducers({
    counter: counterReducer,
    isLogged: isLoggedReducer,
    user: userReducer,
    receipt: receiptReducer
})

export default allReducers;