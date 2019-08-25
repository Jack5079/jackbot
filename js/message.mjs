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
function Message (content, sender) {
  if (!content) throw Error('No content!')
  const channel = document.body
  channel.send = (content) => Message(content, bot)
  const html = document.createElement('div')
  const pfp = document.createElement('img')
  const text = document.createElement('p')
  const name = document.createElement('h2')
  name.innerText = sender.name
  pfp.src = sender.url
  html.appendChild(pfp)
  html.appendChild(name)
  text.innerText = content
  html.appendChild(text)
  document.body.appendChild(html)
  return {
    content: content,
    author: sender,
    delete: () => html.remove(),
    channel: channel,
    createdAt: new Date()
  }
}

export default Message
