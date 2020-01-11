export default class DiscordClientFake {
  on (event = '', callback = () => {}) {
    if (!this.events[event]) this.events[event] = []
    this.events[event].push(callback)
    return () => {
      this.events[event][this.events[event].indexOf(callback)] = () => {}
    }
  }
  constructor () {
    this.events = Object.create(null)
    document.querySelector('#input').addEventListener('botmessage', env => {
      this.emit('message', env.detail)
    })
  }
  emit (event = '', message) {
    if (!this.events[event]) this.events[event] = []
    this.events[event].forEach(e => e(message))
  }
}
