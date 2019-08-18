/* global commands */
export default { // The command list
  repeat: async (message, args) => { // Repeats what the user typed after
    message.channel.send(args.join(' '))
  },
  new: async (message, args) => { // Lets users create a new command within the app
    if (args.length) {
      let name = args[0] // record the name before we remove it
      args.shift() // remove the name
      commands[name] = new (Object.getPrototypeOf(async () => { }).constructor)('message', 'args', args.join(' ')) // make a command with the arguments that are left
      message.channel.send(`🎉Created ${name}!`) // tell the user
    }
  },
  say: async (message, args) => { // Like -repeat but it hides the message with the command
    message.channel.send(args.join(' ')); message.delete()
  },
  votepoop: async (message, args) => { // I was requested to add this
    message.channel.send('😎 i voted for poop')
  }
}
