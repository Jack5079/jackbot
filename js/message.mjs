/** @module ../js/message.mjs */
/** Class representing a message. */
export default class Message {
  time = new Date
  /**
   * Creates a message.
   * @constructor
   * @author Jack5079
   * @param {String} content The content of the message
   * @param {Object} sender An object with a name and url property
   * @example
   * // Create a message as a bot
   * import Message from '../js/message.mjs'
   * const bot = {
   *    name: 'Your computer',
   *    url: './images/bot.png'
   * }
   * const message = new Message('Hello World!', bot)
   */
  constructor (
    content,
    sender = { name: 'No Username', url: './images/bot.png' }
  ) {
    if (!content) throw Error('No content!')
    if (!sender) throw Error('You forgot to provide a sender!')
    if (!sender.name) console.warn('No name of sender')
    if (!sender.url) console.warn('Please provide a URL in the sender object.')
    this.html = document.createElement('div')
    this.html.classList.add('message') // fixes a bug with the width
    const pfp = new Image(100, 100)
    const text = document.createElement('p')
    const name = document.createElement('h2')
    const time = document.createElement('small')
    time.innerText = this.time.toLocaleString()
    name.innerText = sender.name
    pfp.src = sender.url
    this.html.appendChild(pfp)
    this.html.appendChild(name)
    name.appendChild(time)
    text.innerText = content
    this.html.appendChild(text)
    document.body.appendChild(this.html)
    this.author = sender
  }
  get content () {
    return this.html.querySelector('p').innerText
  }

  set content (val) {
    this.html.querySelector('p').innerText = val
  }

  /**
   * Deletes the message.
   * @author Jack5079
   * @example
   * // A say command
   * import loader from '../js/loader.mjs'
   * new loader({
   *   say(message, args) {
   *     message.reply(args.join(' ')) // Copy the user
   *     message.delete() // Delete the message!!!!
   *   }
   * },{prefix: '~'})
   */
  delete () {
    this.html.remove()
  }

  toString () {
    return `${this.author.name}: ${this.content}`
  }
}
