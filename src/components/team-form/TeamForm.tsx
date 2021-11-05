import { FC, useEffect, useState } from 'react'
import { Button, Empty, Form, Input, Modal } from 'antd'
import { v4 as genId } from 'uuid'
import {
  Team,
  TeamUser,
  Tournament,
  tournamentsActions,
} from '../../store/tournaments/reducers/tournamentsSlice'

import styles from './TeamForm.module.scss'
import { useAppDispatch } from '../../store/hooks'

interface Props {
  visible: boolean
  setVisible: (vis: boolean) => void
  currentOpenedTeam: {
    index: number
    id: string
  }
  teams: Team[]
  tour: Tournament
}

export const TeamForm: FC<Props> = ({
  visible,
  setVisible,
  currentOpenedTeam,
  teams,
  tour,
}) => {
  const disptch = useAppDispatch()
  const [form] = Form.useForm()

  const [users, setUsers] = useState<TeamUser[]>([
    ...(tour.teams.filter((team) => team.id === currentOpenedTeam.id)[0]
      ?.users || []),
  ])

  useEffect(() => {
    setUsers([
      ...(tour.teams.filter((team) => team.id === currentOpenedTeam.id)[0]
        ?.users || []),
    ])
  }, [tour])

  const addUser = () => {
    setUsers([
      ...users,
      {
        id: genId(),
        name: '',
      },
    ])
  }

  const onFormSubmit = (formValues: any) => {
    disptch(
      tournamentsActions.editTour({
        ...tour,
        teams: [
          ...tour.teams.map((team) => {
            if (team.id === currentOpenedTeam.id) {
              return {
                ...team,
                teamName: formValues.teamName,
                users,
              }
            } else return team
          }),
        ],
      })
    )
    form.resetFields()
    setUsers([])
    setVisible(false)
  }

  return (
    <Modal
      title={`Команда ${currentOpenedTeam.index}`}
      centered
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      zIndex={15}
      footer={<></>}
    >
      <Form onFinish={onFormSubmit} form={form} layout="vertical">
        <Form.Item
          required
          rules={[
            {
              required: true,
              message: 'Поле обязательно для заполнения',
            },
          ]}
          label="Название"
          name="teamName"
        >
          <Input placeholder={`Команда ${currentOpenedTeam.index}`} />
        </Form.Item>
        {users.length > 0 ? (
          <>
            <span className={styles.title}>Участники команды: </span>
            {users.map((user, index) => (
              <Form.Item
                key={user.id}
                label={`ФИО Участника ${index + 1}`}
                name={`user_${user.id}`}
                required
                rules={[
                  {
                    required: true,
                    message: 'ФИО обязательно для заполнения',
                  },
                ]}
              >
                <Input
                  onChange={(e) => {
                    setUsers([
                      ...users.map((userMapped) => {
                        if (userMapped.id === user.id) {
                          return {
                            ...user,
                            name: e.target.value,
                          }
                        } else return userMapped
                      }),
                    ])
                  }}
                  placeholder={`ФИО Участника ${index + 1}`}
                  value={user.name}
                />
              </Form.Item>
            ))}
            <div className={styles.buttonsWrap}>
              <Button
                style={{ width: 'fit-content' }}
                onClick={() => {
                  addUser()
                }}
                ghost
                type={'primary'}
              >
                Добавить участника
              </Button>
              <Button
                style={{ width: 'fit-content' }}
                onClick={() => {
                  setUsers([
                    ...users.filter(
                      (user, index) => index + 1 !== users.length
                    ),
                  ])
                }}
                ghost
                danger
              >
                Удалить участника
              </Button>
            </div>
          </>
        ) : (
          <div className={styles.empty}>
            <Empty
              description={'Участники не добавлены'}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
            <Button
              style={{ width: 'fit-content' }}
              onClick={() => {
                addUser()
              }}
              ghost
              type={'primary'}
            >
              Добавить участника
            </Button>
          </div>
        )}
        <Form.Item style={{ marginTop: 50 }}>
          <Button
            onClick={() => {
              form.submit()
            }}
            type="primary"
          >
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}
