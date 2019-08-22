/**
 * Creates a user.
 * @constructor
 * @author: Jack5079
 * @param {String} name The username
 * @param {String} url The URL of the profile picture.
 */
function User (name, url) {
  this.name = name
  this.url = url
}

/**
 * Creates a message.
 * @constructor
 * @author: Jack5079
 * @param {String} content The content of the message
 * @param {User} sender Who (or what) sent the message?
 */
function Message (content, sender) {
  this.content = content
  this.createdAt = new Date()
  this.author = sender
  this.channel = document.body
  this.channel.send = (content) => { Message(content, new User('Bot', './images/bot.png')) }
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
  this.delete = () => html.remove()
}
export { User, Message }
