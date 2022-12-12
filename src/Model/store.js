import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlice';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    data: dataReducer,
  }
})

// 若有多個 reducer 要包起來，可以使用combineReducers()

export { store };

