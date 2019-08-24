import Message from './message.mjs'
import { browser } from './users.mjs'

export default function (commands) {
  document.querySelector('#input').addEventListener('keyup', e => { // For every keypress
    if (e.key === 'Enter') { // If it's enter
      (m => { // This processes the commmand
        Object.keys(commands).forEach((n) => { // For every command
          if (m.content.startsWith(`-${n}`)) commands[n](m, m.content.substring(2 + n.length).split(' ')) // Run the command if input = command (also provide args)
        })
      })(new Message(e.currentTarget.value, browser))
    }
  })
}
