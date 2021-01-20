module.exports = {
    name: 'ping',
    description: 'Responds with Pong!',
    execute(message, args) {
        message.channel.send('Pong!')
    } 
}