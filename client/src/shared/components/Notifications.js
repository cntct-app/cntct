import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { dimension, color, effect, generateGradient, generateHighlightBoxShadow, highlight, text } from '../theme'
import NotificationHelper from '../notificationHelper'

import Glyph from './Glyph'

const NotificationContainer = styled.div`
  ${({ type }) => type === 'error' ? css`
    background-color: ${color.error};
    background-image: ${generateGradient(color.error)};
    box-shadow: ${generateHighlightBoxShadow(highlight.error)}, ${effect.dropShadow};
  ` : css`
    background-color: ${color.brand};
    background-image: ${generateGradient(color.brand)};
    box-shadow: ${generateHighlightBoxShadow(highlight.brand)}, ${effect.dropShadow};
  `}

  border-radius: ${dimension.border.radius};
  opacity: 0;
  transition: transform 0.5s ease, opacity 0.5s linear;
  transform: translateY(-62px);

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

  > ${Glyph} {
    margin-right: ${dimension.spacing.connected};
    filter: invert(100%);
  }

  > p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  ${({ isVisible }) => isVisible && css`
    opacity: 1;
    transform: translateY(0);
  `}
`

const Notification = ({ content, isVisible, type }) => (
  <NotificationContainer isVisible={isVisible} type={type}>
    {type && <Glyph name={type} secondary />}
    <p>{ content }</p>
  </NotificationContainer>
)

Notification.propTypes = {
  content: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  type: PropTypes.string
}

class Notifications extends Component {
  constructor (props) {
    super(props)

    this.tick = this.tick.bind(this)

    this.state = {
      isNotificationVisible: false,
      notifications: []
    }
  }
  tick () {
    if (this.state.notifications.length === 0) {
      return
    }

    this.setState({
      isNotificationVisible: true
    })

    setTimeout(() => {
      this.setState({
        isNotificationVisible: false
      })
    }, 1500)

    setTimeout(() => {
      this.setState(prevState => ({
        notifications: prevState.notifications.slice(1)
      }))

      this.tick()
    }, 2000)
  }
  componentDidMount () {
    NotificationHelper.subscribe(notification => {
      if (this.state.notifications.length === 0 || notification.content !== this.state.currentNotification.content) {
        this.setState(previousState => ({
          notifications: [
            ...previousState.notifications,
            notification
          ]
        }))
      }

      if (this.state.notifications.length === 1) {
        this.tick()
      }
    })
  }
  render () {
    const currentNotification = this.state.notifications[0] || {}

    return (
      <>
        <Notification isVisible={this.state.isNotificationVisible} type={currentNotification.type} content={currentNotification.content} />
      </>
    )
  }
}

export default Notifications
