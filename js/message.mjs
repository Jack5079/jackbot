/** @module ../js/message.mjs */
import { bot } from './users.mjs'

/** Class representing a message. */
export default class Message {
  /**
  * Creates a message.
  * @constructor
  * @author Jack5079
  * @param {String} content The content of the message
  * @param {Object} sender An object with a name and url property
  * @example <caption>Create a message as a bot</caption>
  * import Message from '../js/message.mjs'
  * const bot = {
  *    name: 'Your computer',
  *    url: './images/bot.png'
  * }
  * const message = new Message('Hello World!', bot)

  */
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
    this.author = sender
    this.createdAt = new Date()
  }
  get content () {
    return this.html.querySelector( 'p' ).innerText
  }

  set content ( val ) {
    this.html.querySelector( 'p' ).innerText = val
  }

  /**
  * Deletes the message.
  * @author Jack5079
  * @example <caption>A say command</caption>
  * import loader from '../js/loader.mjs'
  * loader({
  *   say(message, args) {
  *     message.reply(args.join(' ')) // Copy the user
  *     message.delete() // Delete the message!!!!
  *   }
  * },{prefix: '~'})
  
  */
  delete () {
    this.html.remove()
  }

  /**
    * Replies to the message.
    * @author Jack5079
    * @example <caption>A simple talking command</caption>
    * import loader from '../js/loader.mjs'
    * loader({
    *   stuff(message) {
    *     message.reply('I\'m stuff 😳')
    *   }
    * },{prefix: 'reply!'})
  
    */
  reply ( content ) {
    return new Message( content, bot )
  }
}
