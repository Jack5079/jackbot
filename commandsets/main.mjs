/* global user */
import Commands from '../js/loader.mjs' // Import the loader

let deferredPrompt
window.addEventListener('beforeinstallprompt', e => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault()
  // Stash the event so it can be triggered later.
  deferredPrompt = e
})

const main = new Commands(
  {},
  {
    // The options
    prefix: '-', // What you need to put at the start of the command
    user: {
      // Who the bot will post as
      name: 'Your computer',
      url: './images/bot.png'
    }
  }
)

main.add({
  // The command list
  repeat (message, args) {
    // Repeats what the user typed after
    message.channel.send(args.join(' '))
  },
  new (message, args, bot) {
    // Lets users create a new command within the app
    if (args.length) {
      const name = args[0] // record the name before we remove it
      args.shift() // remove the name
      // eslint-disable-next-line no-new-func
      bot.commands[name] = new Function('message', 'args', args.join(' ')) // make a command with the arguments that are left
      message.channel.send(`🎉Created ${name}!`) // tell the user
    }
  },
  say (message, args) {
    // Like -repeat but it hides the message with the command
    message.channel.send(args.join(' '))
    message.delete()
  },
  votepoop (message) {
    // I was requested to add this
    message.channel.send('😎 i voted for poop')
  },

  async install (message) {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      // Wait for the user to respond to the prompt
      const choiceResult = await deferredPrompt.userChoice
      if (choiceResult.outcome === 'accepted') {
        message.channel.send('Thanks for installing JackBot Web!')
      } else {
        message.channel.send(
          "You didn't install it? Sorry that our website wasn't worth installing!"
        )
      }
      deferredPrompt = null
    }
  },

  changename (message, args) {
    user.name = args.join(' ')
    message.channel.send(`Changed your username to ${args.join(' ')}!`)
  }
})

console.log('Loaded commands!', main)
