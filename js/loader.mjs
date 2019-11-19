/** @module ../js/loader.mjs */
import Message from './message.mjs'

export default class Loader {
  /**
   * Loads commands and settings.
   * @example <caption>A bot with a say command and the prefix "-"</caption>
   * import Loader from './loader.mjs'
   * new Loader({
   *    say (message, args) {
   *      message.reply(args.join(' '))
   *    }
   *  },
   *  {
   *    prefix: '-'
   * })
   * @author Jack5079
   * @param {Object} commands An object of functions.
   * @param {Object} options The options that will be used when loading.
   */
  constructor (commands, options) {
    this.deleted = false
    document.querySelector('#input').addEventListener('botmessage', event => { // When a message is sent
      if (!this.deleted) {
      let message = event.detail // Get the message
      message.reply = content => {
        // Add a reply function
        return new Message(content, options.user) // send msg
      }
      Object.keys(commands).forEach(name => {
        // For every command
        if (message.content.split(' ')[0] === `${options.prefix}${name}`) {
          // If it matches a command
          const args = message.content
            .substring(options.prefix.length + 1 + name.length)
            .split(' ') // Make the args array
          commands[name](message, args) // Run the command!
        }
      })
    }
  })
  }

  remove () {
    this.deleted = true
  }

  restore () {
    this.deleted = false
  }
}
