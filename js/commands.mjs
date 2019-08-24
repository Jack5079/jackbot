import loadCommands from './loader.mjs' // Import the loader

loadCommands({ // The command list
  repeat (message, args) { // Repeats what the user typed after
    message.channel.send(args.join(' '))
  },
  new (message, args) { // Lets users create a new command within the app
    if (args.length) {
      const name = args[0] // record the name before we remove it
      args.shift() // remove the name
      // eslint-disable-next-line no-new-func
      this[name] = new Function('message', 'args', args.join(' ')) // make a command with the arguments that are left
      message.channel.send(`🎉Created ${name}!`) // tell the user
    }
  },
  say (message, args) { // Like -repeat but it hides the message with the command
    message.channel.send(args.join(' ')); message.delete()
  },
  votepoop (message, args) { // I was requested to add this
    message.channel.send('😎 i voted for poop')
  }
}, { // The options
  prefix: '-' // What you need to put at the start of the command
})
