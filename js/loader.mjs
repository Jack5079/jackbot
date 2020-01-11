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
        Object.keys(this.commands).forEach(name => {
          // For every command
          // example commmand: -test hello
          // example command with spaces: -a test hello
          if (
            message.content.startsWith(`${options.prefix}${name} `) || // matches any command with a space after
            message.content === `${options.prefix}${name}`
          ) {
            // matches commands that are just the command
            // If it matches a command
            const args = message.content
              .substring(options.prefix.length + 1 + name.length)
              .split(' ') // Make the args array
            message.reply = str => {
              return new Message(str, options.user)
            }
            console.log(
              `${message.author.username} used the ${options.prefix}${name} command.`
            )
            this.commands[name](message, args, this) // Run the command!
          }
        })
      }
    })
  }

  add (name, func) {
    if (name && func) this.commands[name] = func
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

// export default class Bot extends DiscordClientFake {
//   /**
//    * Loads commands and settings.
//    * @example <caption>A bot with a say command and the prefix "-"</caption>
//    * import Loader from './loader.mjs'
//    * new Loader({
//    *    say (message, args) {
//    *      message.reply(args.join(' '))
//    *    }
//    *  },
//    *  {
//    *    prefix: '-'
//    * })
//    * @author Jack5079
//    * @param {Object} commands An object of functions.
//    * @param {Object} options The options that will be used when loading.
//    */
//   constructor (commands, options = {
//     prefix: '-'
//   }) {
//     this.deleted = false
//     document.querySelector('#input').addEventListener('botmessage', event => { // When a message is sent
//       if (!this.deleted) {
//         const message = event.detail // Get the message
//         message.reply = content => {
//         // Add a reply function
//           return new Message(content, options.user) // send msg
//         }
//         Object.keys(commands).forEach(name => {
//         // For every command
//         // example commmand: -test hello
//         // example command with spaces: -a test hello
//           if (
//             message.content.startsWith(`${options.prefix}${name} `) || // matches any command with a space after
//           message.content === `${options.prefix}${name}`
//           ) { // matches commands that are just the command
//           // If it matches a command
//             const args = message.content
//               .substring(options.prefix.length + 1 + name.length)
//               .split(' ') // Make the args array
//             commands[name](message, args) // Run the command!
//           }
//         })
//       }
//     })
//   }

//   remove () {
//     this.deleted = true
//   }

//   restore () {
//     this.deleted = false
//   }
// }
