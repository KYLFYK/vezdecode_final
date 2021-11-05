import React, { FC } from 'react'
import { GridElem } from '../../components/grid-element/GridElem'
import { FillGrid } from '../../components/fill-grid/FillGrid'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

import styles from './TourGrid.module.scss'
import { tournamentsActions } from '../../store/tournaments/reducers/tournamentsSlice'

interface RouteProps {
  tourId: string
}

export const TourGrid: FC<RouteComponentProps<RouteProps>> = ({ match }) => {
  const dispatch = useAppDispatch()
  const thisTour = useAppSelector(
    (state) => state.tournamentsReducer.list.tournamentsList
  ).filter((tour) => tour.id === match.params.tourId)[0]

  const setTeamWin = (teamId: string, tour: string) => {
    dispatch(
      tournamentsActions.setTeamWin({
        teamId: teamId,
        tourN: tour,
        id: thisTour.id,
      })
    )
  }

  if (thisTour) {
    return (
      <div className={styles.wrapper}>
        <FillGrid tour={thisTour} />
        <div className={styles.col}>
          <div className={styles.group}>
            <GridElem
              onClick={() => {
                if (!thisTour.teams[0].winnA && !thisTour.teams[1].winnA) {
                  setTeamWin(thisTour.teams[0].id, 'winnA')
                }
              }}
              name={thisTour.teams[0].teamName}
              isWinner={thisTour.teams[0].winnA}
            />
            <GridElem
              onClick={() => {
                if (!thisTour.teams[0].winnA && !thisTour.teams[1].winnA) {
                  setTeamWin(thisTour.teams[1].id, 'winnA')
                }
              }}
              name={thisTour.teams[1].teamName}
              isWinner={thisTour.teams[1].winnA}
            />
          </div>
          <div className={styles.group}>
            <GridElem
              onClick={() => {
                if (!thisTour.teams[2].winnA && !thisTour.teams[3].winnA) {
                  setTeamWin(thisTour.teams[2].id, 'winnA')
                }
              }}
              name={thisTour.teams[2].teamName}
              isWinner={thisTour.teams[2].winnA}
            />
            <GridElem
              onClick={() => {
                if (!thisTour.teams[2].winnA && !thisTour.teams[3].winnA) {
                  setTeamWin(thisTour.teams[3].id, 'winnA')
                }
              }}
              name={thisTour.teams[3].teamName}
              isWinner={thisTour.teams[3].winnA}
            />
          </div>
          <div className={styles.group}>
            <GridElem
              onClick={() => {
                if (!thisTour.teams[4].winnA && !thisTour.teams[5].winnA) {
                  setTeamWin(thisTour.teams[4].id, 'winnA')
                }
              }}
              name={thisTour.teams[4].teamName}
              isWinner={thisTour.teams[4].winnA}
            />
            <GridElem
              onClick={() => {
                if (!thisTour.teams[4].winnA && !thisTour.teams[5].winnA) {
                  setTeamWin(thisTour.teams[5].id, 'winnA')
                }
              }}
              name={thisTour.teams[5].teamName}
              isWinner={thisTour.teams[5].winnA}
            />
          </div>
          <div className={styles.group}>
            <GridElem
              onClick={() => {
                if (!thisTour.teams[6].winnA && !thisTour.teams[7].winnA) {
                  setTeamWin(thisTour.teams[6].id, 'winnA')
                }
              }}
              name={thisTour.teams[6].teamName}
              isWinner={thisTour.teams[6].winnA}
            />
            <GridElem
              onClick={() => {
                if (!thisTour.teams[6].winnA && !thisTour.teams[7].winnA) {
                  setTeamWin(thisTour.teams[7].id, 'winnA')
                }
              }}
              name={thisTour.teams[7].teamName}
              isWinner={thisTour.teams[7].winnA}
            />
          </div>
        </div>
        <div className={styles.col}>
          <div className={styles.group}>
            <div className={styles.mark} />
            <GridElem
              name={
                thisTour.teams[0].winnA
                  ? thisTour.teams[0].teamName
                  : thisTour.teams[1].winnA
                  ? thisTour.teams[1].teamName
                  : ''
              }
            />
            <GridElem
              name={
                thisTour.teams[2].winnA
                  ? thisTour.teams[2].teamName
                  : thisTour.teams[3].winnA
                  ? thisTour.teams[3].teamName
                  : ''
              }
            />
          </div>
          <div className={styles.group}>
            <div className={styles.mark} />
            <GridElem
              name={
                thisTour.teams[4].winnA
                  ? thisTour.teams[4].teamName
                  : thisTour.teams[5].winnA
                  ? thisTour.teams[5].teamName
                  : ''
              }
            />
            <GridElem
              name={
                thisTour.teams[6].winnA
                  ? thisTour.teams[6].teamName
                  : thisTour.teams[7].winnA
                  ? thisTour.teams[7].teamName
                  : ''
              }
            />
          </div>
        </div>
        <div className={styles.col}>
          <div className={styles.group}>
            <div className={styles.mark} />
            <GridElem
              name={thisTour.teams.filter((team) => team.winnB)[0]?.teamName}
            />
            <GridElem
              name={thisTour.teams.filter((team) => team.winnB)[1]?.teamName}
            />
          </div>
        </div>
      </div>
    )
  } else return <Redirect to={'/'} />
}
