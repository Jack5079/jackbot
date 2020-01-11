/* global CustomEvent, globalThis */
import Message from './message.mjs'
globalThis.user = {
  name: 'You',
  url:
    '//yt3.ggpht.com/-7zFDHK5X45w/AAAAAAAAAAI/AAAAAAAAAAA/QJfHeLTEZwE/s900-c-k-no-mo-rj-c0xffffff/photo.jpg'
}

function send (e) {
  if (e.key === 'Enter') {
    // If it's enter
    const message = new Message(e.currentTarget.value, user)
    const env = new CustomEvent('botmessage', {
      detail: message
    })
    document.querySelector('#input').dispatchEvent(env)
    e.currentTarget.value = '' // Reset the field
  }
}
document.querySelector('#input').addEventListener('keyup', send)
