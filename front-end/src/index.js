import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore } from 'redux'
import allReducer from './Reducers'
import { Provider } from 'react-redux'

// get redux chrome extension from here
// https://github.com/reduxjs/redux-devtools/tree/main/extension#installation

// create a redux store with all reducers combined
// added window line to show in chrome
const store = createStore(
    allReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
)