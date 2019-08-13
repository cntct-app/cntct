class NotificationHelper {
  subscribers = []
  subscribe = cb => {
    this.subscribers.push(cb)
  }
  add = ({ content, type = 'notification' }) => {
    this.subscribers.forEach(cb => cb({
      content,
      type
    }))
  }
}

const notificationHelper = new NotificationHelper()

export default notificationHelper
