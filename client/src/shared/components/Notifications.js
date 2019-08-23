import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import Container from './Container'
import Glyph from './Glyph'
import Label from './Label'

import { color, dimension, effect, generateGradient, generateHighlightBoxShadow, highlight, text } from '../theme'
import { notificationHelper } from '../helpers'

const NotificationContainer = styled(Container).attrs(() => ({
  row: true,
  spacing: dimension.spacing.connected
}))`
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
    margin-top: 2px;
  }

  > ${Label} {
    flex-grow: 1;
    flex-shrink: unset;
  }

  ${({ isVisible }) => isVisible && css`
    opacity: 1;
    transform: translateY(0);
  `}
`

const Notification = ({ content, isVisible, type }) => (
  <NotificationContainer isVisible={isVisible} type={type}>
    { type && <Glyph glyph={type} /> }
    <Label>{ content }</Label>
  </NotificationContainer>
)

Notification.propTypes = {
  content: PropTypes.string, // Content is blank when notification is off screen
  isVisible: PropTypes.bool.isRequired,
  type: PropTypes.string
}

class Notifications extends Component {
  state = {
    currentNotification: {},
    isNotificationVisible: false,
    notifications: []
  }
  tick = () => {
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
  componentDidMount = () => {
    notificationHelper.subscribe(this.handleNewNotification)
  }
  handleNewNotification = notification => {
    if (this.state.notifications.length === 0 || notification.content !== this.state.currentNotification.content) {
      this.setState(previousState => ({
        currentNotification: notification,
        notifications: [
          ...previousState.notifications,
          notification
        ]
      }), () => {
        if (this.state.notifications.length === 1) {
          this.tick()
        }
      })
    }
  }
  render = () => (
    <Notification isVisible={this.state.isNotificationVisible} type={this.state.currentNotification.type} content={this.state.currentNotification.content} />
  )
}

export default Notifications
