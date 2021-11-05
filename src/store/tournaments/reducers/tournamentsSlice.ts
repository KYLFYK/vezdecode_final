import { createSlice } from '@reduxjs/toolkit'
import { v4 as genId } from 'uuid'

export interface TeamUser {
  name: string
  id: string
}

export interface Team {
  id: string
  teamName: string
  users: TeamUser[]
  winnA: false
  winnB: false
  winnC: false
}

export interface Tournament {
  name: string
  id: string
  teams: Team[]
}

interface InitialType {
  tournamentsList: Tournament[]
}

const initialState: InitialType = {
  tournamentsList: [],
}

const tournamentsSlice = createSlice({
  name: 'tournaments',
  initialState: initialState as InitialType,
  reducers: {
    addTournament: (state, { payload }) => {
      state.tournamentsList = [
        {
          id: payload.id,
          name: payload.name,
          teams: [
            {
              id: genId(),
              teamName: '',
              users: [],
              winnA: false,
              winnB: false,
              winnC: false,
            },
            {
              id: genId(),
              teamName: '',
              users: [],
              winnA: false,
              winnB: false,
              winnC: false,
            },
            {
              id: genId(),
              teamName: '',
              users: [],
              winnA: false,
              winnB: false,
              winnC: false,
            },
            {
              id: genId(),
              teamName: '',
              users: [],
              winnA: false,
              winnB: false,
              winnC: false,
            },
            {
              id: genId(),
              teamName: '',
              users: [],
              winnA: false,
              winnB: false,
              winnC: false,
            },
            {
              id: genId(),
              teamName: '',
              users: [],
              winnA: false,
              winnB: false,
              winnC: false,
            },
            {
              id: genId(),
              teamName: '',
              users: [],
              winnA: false,
              winnB: false,
              winnC: false,
            },
            {
              id: genId(),
              teamName: '',
              users: [],
              winnA: false,
              winnB: false,
              winnC: false,
            },
          ],
        },
        ...state.tournamentsList,
      ]
    },
    editTour: (
      state,
      {
        payload,
      }: {
        payload: Tournament
      }
    ) => {
      state.tournamentsList = [
        ...state.tournamentsList.map((tour) => {
          if (tour.id === payload.id) {
            return {
              ...payload,
            }
          } else return tour
        }),
      ]
    },
    setTeamWin: (
      state,
      {
        payload,
      }: {
        payload: {
          teamId: string
          tourN: string
          id: string
        }
      }
    ) => {
      state.tournamentsList = [
        ...state.tournamentsList.map((tour) => {
          if (tour.id === payload.id) {
            return {
              ...tour,
              teams: [
                ...tour.teams.map((team) => {
                  if (team.id === payload.teamId) {
                    return {
                      ...team,
                      [payload.tourN]: true,
                    }
                  } else return team
                }),
              ],
            }
          } else return tour
        }),
      ]
    },
  },
})

export const tournamentsActions = tournamentsSlice.actions
export default tournamentsSlice.reducer
