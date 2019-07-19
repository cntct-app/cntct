import React from 'react'
import { render } from 'react-dom'

import Root from './Root'
import * as notificationHelper from './notificationHelper'

window.notificationHelper = notificationHelper

render(
  <Root />,
  document.getElementById('root')
)
