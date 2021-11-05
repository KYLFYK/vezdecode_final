import { combineReducers } from '@reduxjs/toolkit'
import listReducer from './reducers/tournamentsSlice'

export const tournamentsReducer = combineReducers({
  list: listReducer,
})
