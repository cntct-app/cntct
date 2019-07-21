class NotificationHelper {
  constructor () {
    this.subscribers = []
  }
  subscribe (cb) {
    this.subscribers.push(cb)
  }
  add ({ content, type = 'info' }) {
    this.subscribers.forEach(cb => cb({
      content,
      type
    }))
  }
}

const notificationHelper = new NotificationHelper()

export default notificationHelper
