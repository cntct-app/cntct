import io from 'socket.io-client'

const socket = io('http://localhost:5001')

const subscribeToMembers = (partyCode, cb) => {
  socket.emit('subscribe_to_party', partyCode)
  socket.on('update_members', members => {
    console.log(members)
    cb(members)
  })
}

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

export {
  notificationHelper,
  subscribeToMembers
}
