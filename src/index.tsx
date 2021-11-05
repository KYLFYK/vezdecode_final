import React, { StrictMode } from 'react'
import { render } from 'react-dom'
import { App } from './App'
import { store } from './store/store'
import { Provider } from 'react-redux'

render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
)
