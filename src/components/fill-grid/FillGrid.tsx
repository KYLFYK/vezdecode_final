import { FC, useState } from 'react'
import { Button, Drawer } from 'antd'
import { TeamForm } from '../team-form/TeamForm'
import { useHistory } from 'react-router-dom'
import { Tournament } from '../../store/tournaments/reducers/tournamentsSlice'

import styles from './FillGrid.module.scss'

interface Props {
  tour: Tournament
}

export const FillGrid: FC<Props> = ({ tour }) => {
  const history = useHistory()
  const [visible, setVisible] = useState(false)
  const [teamFormVis, setTeamFormVis] = useState(false)

  const [currentOpenedTeam, setCurrentOpenedTeam] = useState({
    index: 0,
    id: '',
  })

  return (
    <div className={styles.wrapper}>
      <TeamForm
        currentOpenedTeam={currentOpenedTeam}
        teams={tour.teams}
        visible={teamFormVis}
        setVisible={setTeamFormVis}
        tour={tour}
      />
      <Button
        type={'link'}
        onClick={() => {
          history.push('')
        }}
      >
        Назад
      </Button>
      <Button
        type={'primary'}
        onClick={() => {
          setVisible(true)
        }}
      >
        Добавить команды
      </Button>
      <Drawer
        title="Заполнение турнирной сетки"
        placement="right"
        onClose={() => {
          setVisible(false)
        }}
        visible={visible}
        width={390}
        zIndex={12}
      >
        {tour.teams.map((team, index) => (
          <div key={team.id} className={styles.teamFilled}>
            <span className={styles.teamNum}>{`Команда ${index + 1}`}</span>
            <span
              className={`${styles.teamName} ${
                team.teamName.length === 0 && styles.empty
              }`}
            >
              {team.teamName ? team.teamName : 'Название не указано'}
            </span>
            <Button
              ghost
              onClick={() => {
                setTeamFormVis(true)
                setCurrentOpenedTeam({
                  index: index + 1,
                  id: team.id,
                })
              }}
              type="primary"
            >
              Редактировать команду {index + 1}
            </Button>
          </div>
        ))}
      </Drawer>
    </div>
  )
}
