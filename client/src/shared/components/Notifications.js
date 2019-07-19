import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { dimension, color, effect, generateGradient, generateHighlightBoxShadow, highlight, text } from '../theme'

import Glyph from './Glyph'

const NotificationContainer = styled.div`
  ${({ type }) =>
    type === 'error' ? css`
      background-color: ${color.error};
      background-image: ${generateGradient(color.error)};
      box-shadow: ${generateHighlightBoxShadow(highlight.error)}, ${effect.dropShadow};
    ` : css`
      background-color: ${color.brand};
      background-image: ${generateGradient(color.brand)};
      box-shadow: ${generateHighlightBoxShadow(highlight.brand)}, ${effect.dropShadow};
    `
}
  border-radius: ${dimension.border.radius};

  display: flex;
  align-items: center;

  font-weight: ${text.title.secondary.weight};

  position: absolute;
  top: ${dimension.spacing.separate};
  left: 0;
  right: 0;

  
  margin: 0 auto;
  padding: ${dimension.spacing.related};
  
  width: calc(100% - (${dimension.spacing.separate} * 2));
  max-width: calc(${dimension.appWidth} - (${dimension.spacing.separate} * 2));

  > img {
    margin-right: ${dimension.spacing.connected};
    filter: invert(100%);
  }
`

const Notification = ({ type, content }) => (
  <NotificationContainer type={type}>
    <Glyph name={type} secondary />
    <p>{ content }</p>
  </NotificationContainer>
)

class Notifications extends Component {
  constructor (props) {
    super(props)

    this.state = {
      notifications: []
    }
  }
  componentDidMount () {
    window.notificationHelper.subscribe(notification => {
      this.setState(prevState => ({
        notifications: [
          ...prevState.notifications,
          notification
        ]
      }))
    })

    window.notificationHelper.add({
      type: 'error',
      content: 'Party not found'
    })
  }
  render () {
    const currentNotification = this.state.notifications[0]

    if (!currentNotification) {
      return null
    }

    return (
      <>
        <Notification type={currentNotification.type} content={currentNotification.content} />
      </>
    )
  }
}

export default Notifications
