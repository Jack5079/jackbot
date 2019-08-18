import { commands } from './commands.mjs'
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
  this.channel.send = (content) => { Message(content, bot) }
  let html = document.createElement('div')
  let pfp = document.createElement('img')
  let text = document.createElement('p')
  let name = document.createElement('h2')
  name.innerText = sender.name
  pfp.src = sender.url
  html.appendChild(pfp)
  html.appendChild(name)
  text.innerText = content
  html.appendChild(text)
  document.body.appendChild(html)
  this.delete = () => html.remove()
}

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

// Create the users.
let browser = new User('You', 'https://yt3.ggpht.com/-7zFDHK5X45w/AAAAAAAAAAI/AAAAAAAAAAA/QJfHeLTEZwE/s900-c-k-no-mo-rj-c0xffffff/photo.jpg')
let bot = new User('Bot', './images/bot.png')

let selector = document.querySelector('#input') // Where you type the command
function processCommand (msg) { // This processes the commmand
  let args = msg.content.split(' ') // Create the arguments that will be used

  Object.keys(commands).forEach((name) => { // For every command
    if (args[0] === '-' + name) { // If the first argument (the command) is the command
      args.shift() // Remove the command from the argument
      commands[name](msg, args) // Run the command
    }
  })
}
selector.addEventListener('keyup', (e) => { // For every keypress
  if (e.key === 'Enter') processCommand(new Message(selector.value, browser)) // If it's enter, run the command
})
