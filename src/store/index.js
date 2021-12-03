import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import wallet from './wallet';
const reducer = combineReducers({
  wallet
});
const store = configureStore({
  reducer
});
export default store;
