import users from '../reducers/users'
import questions from '../reducers/questions'
import authedUser from '../reducers/authedUser'
import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
    questions,
    users,
    authedUser,
    loadingBar: loadingBarReducer
})