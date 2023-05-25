import { combineReducers } from 'redux'
import papers from './papers'
import errors from './errors'
import messages from './messages'
import auth from './auth'
import profiles from './profiles'

export default combineReducers({
    papers,
    errors,
    messages,
    profiles,
    auth

});