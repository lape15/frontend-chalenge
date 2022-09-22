import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import wallet from './wallet';
import user from './user';
import logger from '../logger';
const preloadedState = {};

const reducer = combineReducers({
  wallet,
  user
});
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: import.meta.env.NODE_ENV !== 'production',
  preloadedState
});
export default store;
