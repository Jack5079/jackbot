import { bot } from './users.mjs'
/**
 * Creates a message.
 * @constructor
 * @author Jack5079
 * @param {String} content The content of the message
 * @param {User} sender Who (or what) sent the message?
*/
function Message (content, sender) {
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
