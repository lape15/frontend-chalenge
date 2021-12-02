import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import users from './users';
const reducer = combineReducers({
  users
});
const store = configureStore({
  reducer
});
export default store;
