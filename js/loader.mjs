/** @module ../js/loader.mjs */
/**
 * Loads commands and settings.
 * @example <caption>A bot with a say command and the prefix "-"</caption>
 * import loadCommands from './loader.mjs'
 * loadCommands({
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
import Message from './message.mjs'

let count = 0

export default class Loader {
  constructor ( commands, options ) {
    count++
    document.querySelector( '#input' ).addEventListener( 'botmessage', event => { // For every keypress
      let message = event.detail // Get the message
      message.reply = content => { // Add a reply function
        new Message( content, options.user ) // send msg
      }
      Object.keys( commands ).forEach( ( name ) => { // For every command
        if ( message.content.split( ' ' )[ 0 ] == `${ options.prefix }${ name }` ) { // If it matches a command
          const args = message.content.substring( options.prefix.length + 1 + name.length ).split( ' ' ) // Make the args array
          commands[ name ]( message, args ) // Run the command!
        }
      } )
    } )
  }

  remove () {
    getEventListeners(window).DOMContentLoaded[count].remove()
  }
}
