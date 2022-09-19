import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import wallet from './wallet';
import user from './user';

const reducer = combineReducers({
  wallet,
  user
});
const store = configureStore({
  reducer
});
export default store;
