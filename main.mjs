import { Message } from './constructor.mjs'
import { browser } from './users.mjs'
const commands = { // The command list
  repeat: async function (message, args) { // Repeats what the user typed after
    message.channel.send(args.join(' '))
  },
  new: async function (message, args) { // Lets users create a new command within the app
    if (args.length) {
      const name = args[0] // record the name before we remove it
      args.shift() // remove the name
      this[name] = new (Object.getPrototypeOf(async () => { }).constructor)('message', 'args', args.join(' ')) // make a command with the arguments that are left
      message.channel.send(`🎉Created ${name}!`) // tell the user
    }
  },
  say: async function (message, args) { // Like -repeat but it hides the message with the command
    message.channel.send(args.join(' ')); message.delete()
  },
  votepoop: async function (message, args) { // I was requested to add this
    message.channel.send('😎 i voted for poop')
  }
}

// Anything below this line is used to load the bot
function processCommand (msg) { // This processes the commmand
  const args = msg.content.split(' ') // Create the arguments that will be used

  Object.keys(commands).forEach((name) => { // For every command
    if (args[0] === '-' + name) { // If the first argument (the command) is the command
      args.shift() // Remove the command from the argument
      commands[name](msg, args) // Run the command
    }
  })
}
document.querySelector('#input').addEventListener('keyup', (e) => { // For every keypress
  if (e.key === 'Enter') processCommand(new Message(e.currentTarget.value, browser)) // If it's enter, run the command
})
