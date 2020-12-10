import { createStore, combineReducers, applyMiddleware } from 'redux'
import notificationReducer from './redcuers/notificationReducer'
import blogsReducer from './redcuers/blogReducer'
import userReducer from './redcuers/userReducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import allUsersReducer from './redcuers/allUsersReducer'

const rootState = combineReducers({
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer,
    allUsers: allUsersReducer
})

export const store = createStore(
    rootState,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)