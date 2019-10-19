/* global CustomEvent */
import Message from './message.mjs'
import { browser } from './users.mjs'

function send (e) {
  if (e.key === 'Enter') {
    // If it's enter
    let message = new Message(e.currentTarget.value, browser)
    let env = new CustomEvent('botmessage', {
      detail: message
    })
    document.querySelector('#input').dispatchEvent(env)
    e.currentTarget.value = '' // Reset the field
  }
}
document.querySelector('#input').addEventListener('keyup', send)
