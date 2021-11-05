import { FC, useState } from 'react'
import { Button, Form, Input, Modal, Typography } from 'antd'
import { NavLink, useHistory } from 'react-router-dom'
import { v4 as genId } from 'uuid'

import styles from './MainPage.module.scss'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { tournamentsActions } from '../../store/tournaments/reducers/tournamentsSlice'

const { Title, Text } = Typography

export const MainPage: FC = () => {
  const history = useHistory()
  const [form] = Form.useForm()
  const tournaments = useAppSelector(
    (state) => state.tournamentsReducer.list.tournamentsList
  )
  const dispatch = useAppDispatch()

  const [addNewVis, setAddNewVis] = useState(false)

  const onFormSubmit = (values: any) => {
    let newTour = { name: values.tourName, id: genId() }
    dispatch(tournamentsActions.addTournament(newTour))
    setAddNewVis(false)
    form.resetFields()
    history.push(newTour.id)
  }

  return (
    <div className={styles.wrapper}>
      <Title level={2}>Ваши турнирные сетки</Title>
      <div className={styles.list}>
        {tournaments.length > 0 ? (
          tournaments.map((tour) => (
            <NavLink to={`/${tour.id}`} key={tour.id}>
              {tour.name}
            </NavLink>
          ))
        ) : (
          <Text disabled>Нет созданных турниров</Text>
        )}
      </div>
      <Button
        onClick={() => {
          setAddNewVis(true)
        }}
        type={'primary'}
      >
        Добавить турнир
      </Button>
      <Modal
        title="Новый турнир"
        centered
        visible={addNewVis}
        onOk={() => setAddNewVis(false)}
        onCancel={() => setAddNewVis(false)}
        footer={<></>}
      >
        <Form
          onFinish={onFormSubmit}
          form={form}
          layout="vertical"
          initialValues={{
            tourName: '',
          }}
        >
          <Form.Item
            required
            rules={[
              {
                required: true,
                message: 'Поле обязательно для заполнения',
              },
            ]}
            label="Название турнира"
            name="tourName"
          >
            <Input placeholder="Название турнира" />
          </Form.Item>
          <Form.Item style={{ marginTop: 50 }}>
            <Button
              onClick={() => {
                form.submit()
              }}
              type="primary"
            >
              Создать
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
