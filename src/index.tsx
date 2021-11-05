import React, { Fragment } from 'react'
import { render } from 'react-dom'
import { App } from './App'
import { store } from './store/store'
import { Provider } from 'react-redux'

render(
  <Fragment>
    <Provider store={store}>
      <App />
    </Provider>
  </Fragment>,
  document.getElementById('root')
)
