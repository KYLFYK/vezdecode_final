import { configureStore } from '@reduxjs/toolkit'
import { tournamentsReducer } from './tournaments'

export const store = configureStore({
  reducer: {
    tournamentsReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
