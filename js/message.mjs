import { bot } from './users.mjs'
/**
 * Creates a message.
 * @constructor
 * @author Jack5079
 * @param {String} content The content of the message
 * @param {Object} sender An object with a name and url property
 * @example <caption>Create a message as a bot</caption>
 * import Message from './message.mjs'
 * const bot = {
 *    name: 'Your computer',
 *    url: './images/bot.png'
 * }
 * const message = new Message('Hello World!', bot)

*/
class Message {
  constructor ( content, sender ) {
    if ( !content ) throw Error( 'No content!' )
    if ( !sender ) throw Error( 'You forgot to provide a sender!' )
    if ( !sender.name ) console.warn( 'No name of sender' )
    if ( !sender.url ) console.warn( 'Please provide a URL in the sender object.' )
    this.html = document.createElement( 'div' )
    const pfp = document.createElement( 'img' )
    const text = document.createElement( 'p' )
    const name = document.createElement( 'h2' )
    name.innerText = sender.name
    pfp.src = sender.url
    this.html.appendChild( pfp )
    this.html.appendChild( name )
    text.innerText = content
    this.html.appendChild( text )
    document.body.appendChild( this.html )
    this.content = content
    this.author = sender
    this.createdAt = new Date()
  }

  delete () {
    this.html.remove()
  }

  reply ( content ) {
    new Message( content, bot )
  }
}

export default Message
