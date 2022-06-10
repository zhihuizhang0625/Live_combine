import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import googleAuthReducer from './googleAuthReducer'
import authReducer from './authReducer'
import streamReducer from'./streamReducer'
import messageReducer from './messageReducer';

export default combineReducers({
    auth:googleAuthReducer,
    myAuth : authReducer,
    message: messageReducer,
    form : formReducer,
    streams: streamReducer
})