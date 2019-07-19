const subscribers = []

const subscribe = cb => {
  subscribers.push(cb)
}

const add = notification => {
  subscribers.forEach(cb => cb(notification))
}

export {
  subscribe,
  add
}
