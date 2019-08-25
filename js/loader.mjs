import Message from './message.mjs'
import { browser } from './users.mjs'
/**
 * Loads commands and settings.
 * @example <caption>A bot with a say command and the prefix "-"</caption>
 * import loadCommands from './loader.mjs'
 * loadCommands({
 *    say (message, args) {
 *      message.channel.send(args.join(' '))
 *    }
 *  },
 *  {
 *    prefix: '-'
 * })
 * @author Jack5079
 * @module ./loader.mjs
 * @param {Object} commands An object of functions.
 * @param {Object} options The options that will be used when loading.
 */
export default function (commands, options) {
  document.querySelector('#input').addEventListener('keyup', e => { // For every keypress
    if (e.key === 'Enter') { // If it's enter
      (message => { // This processes the commmand
        Object.keys(commands).forEach((name) => { // For every command
          if (message.content.startsWith(`${options.prefix}${name}`)) { // If it matches a command
            const args = message.content.substring(options.prefix.length + 1 + name.length).split(' ') // Make the args array
            commands[name](message, args) // Run the command!
          }
        })
      })(new Message(e.currentTarget.value, browser)) // the message value inside this function = a new message
      e.currentTarget.value = '' // Reset the field
    }
  })
}
