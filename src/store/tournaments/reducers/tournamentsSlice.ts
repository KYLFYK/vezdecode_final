import { createSlice } from '@reduxjs/toolkit'

interface InitialType {
  tournamentsList: any[]
}

const initialState: InitialType = {
  tournamentsList: [],
}

const tournamentsSlice = createSlice({
  name: 'tournaments',
  initialState: initialState as InitialType,
  reducers: {
    addTournament: (state, { payload }) => {
      state.tournamentsList = [payload, ...state.tournamentsList]
    },
  },
})

export const tournamentsActions = tournamentsSlice.actions
export default tournamentsSlice.reducer
