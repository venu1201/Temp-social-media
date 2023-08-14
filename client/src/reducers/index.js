import { combineReducers } from 'redux';
import authReducer from './auth.js'
import Posts from './Posts.js';
export const reducers = combineReducers({authReducer,Posts });