import Message from './message.mjs'
import { browser } from './users.mjs'

export default function (commands, options) {
  document.querySelector('#input').addEventListener('keyup', e => { // For every keypress
    if (e.key === 'Enter') { // If it's enter
      (message => { // This processes the commmand
        Object.keys(commands).forEach((name) => { // For every command
          if (message.content.startsWith(`${options.prefix}${name}`)) commands[name](message, message.content.substring(2 + name.length).split(' ')) // Run the command if input = command (also provide args)
        })
      })(new Message(e.currentTarget.value, browser))
    }
  })
}
