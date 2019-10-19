import Commands from '../js/loader.mjs' // Import the loader

let deferredPrompt
window.addEventListener( 'beforeinstallprompt', ( e ) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
} )

new Commands( { // The command list
  repeat ( message, args ) { // Repeats what the user typed after
    message.reply( args.join( ' ' ) )
  },
  new ( message, args ) { // Lets users create a new command within the app
    if ( args.length ) {
      const name = args[ 0 ] // record the name before we remove it
      args.shift() // remove the name
      // eslint-disable-next-line no-new-func
      this[ name ] = new Function( 'message', 'args', args.join( ' ' ) ) // make a command with the arguments that are left
      message.reply( `🎉Created ${ name }!` ) // tell the user
    }
  },
  say ( message, args ) { // Like -repeat but it hides the message with the command
    message.reply( args.join( ' ' ) )
    message.delete()
  },
  votepoop ( message ) { // I was requested to add this
    message.reply( '😎 i voted for poop' )
  },

  install ( message ) {
    if ( deferredPrompt ) {
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then( ( choiceResult ) => {
        if ( choiceResult.outcome === 'accepted' ) {
          message.reply( 'Thanks for installing JackBot Web!' )
        } else {
          message.reply( 'You didn\'t install it? Sorry that our website wasn\'t worth installing!' )
        }
        deferredPrompt = null;
      } )
    } else message.reply( 'Your browser doesn\'t support this feature.' )
  }
}, { // The options
  prefix: '-', // What you need to put at the start of the command
  user: { // Who the bot will post as
  "name": "Your computer",
  "url": "./images/bot.png"
}
} )
