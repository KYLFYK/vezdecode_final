import React, { FC } from 'react'
import { TourGrid } from './pages/tour-grid/TourGrid'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'

import './App.css'
import 'antd/dist/antd.css'
import { MainPage } from './pages/main/MainPage'

export const App: FC = () => {
  return (
    <div className="application">
      <Router>
        <Route exact path={'/:tourId'} component={withRouter(TourGrid)} />
        <Route exact path={'/'} component={MainPage} />
      </Router>
    </div>
  )
}
