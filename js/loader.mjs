/* global user */
/** @module ../js/loader.mjs */
import Message from './message.mjs'
import Client from './client.mjs'

class Bot extends Client {
  constructor (
    commands = {},
    options = {
      prefix: '-',
      user: {
        name: 'Default Bot',
        url: './images/bot.png'
      }
    }
  ) {
    super()
    this.commands = commands
    this.on('message', message => {
      // When a message is sent
      if (!message.author.bot) {
        // not a bot
        // matches commands that are just the command
        const name = Object.keys(this.commands).find(cmdname => {
          return message.content.startsWith(`${options.prefix}${cmdname} `) || // matches any command with a space after
            message.content === `${options.prefix}${cmdname}` // matches any command without arguments
        })
        message.reply = text => new Message('@' + user.name + ', ' + text, options.user)
        message.channel = {
          send: text => new Message(text, options.user)
        }
        // Run the command!
        if (name) {
          this.commands[name](
            message, // the message
            // The arguments
            message.content // the content of the message
              .substring(options.prefix.length + 1 + name.length) // only the part after the command
              .split(' ') // split with spaces
            , this)
        } // The bot
      }
    })
  }

  add (name, func) {
    if (typeof name === 'string') this.commands[name] = func
    if (typeof name === 'object') {
      Object.keys(name).forEach(com => {
        this.commands[com] = name[com]
      })
    }
  }

  remove (name) {
    if (typeof name === 'string') delete this.commands[name]

    if (name instanceof Array) {
      name.forEach(com => {
        delete this.commands[com]
      })
    }
  }

  get (name) {
    return this.commands[name]
  }
}

export default Bot
