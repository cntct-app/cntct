const subscribers = []

const subscribe = cb => {
  subscribers.push(cb)
}

const add = ({ content, type = 'info' }) => {
  subscribers.forEach(cb => cb({
    content,
    type
  }))
}

export {
  subscribe,
  add
}
