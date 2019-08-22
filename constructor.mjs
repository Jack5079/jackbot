/**
 * Creates a user.
 * @constructor
 * @author: Jack5079
 * @param {String} name The username
 * @param {String} url The URL of the profile picture.
 */
function User (name, url) {
  return { name, url }
}

/**
 * Creates a message.
 * @constructor
 * @author: Jack5079
 * @param {String} content The content of the message
 * @param {User} sender Who (or what) sent the message?
 */
function Message (content, sender) {
  const channel = document.body
  channel.send = (content) => { Message(content, new User('Bot', './images/bot.png')) }
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
export { User, Message }
