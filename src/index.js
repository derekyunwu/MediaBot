require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client()

client.login(process.env.DISCORDJS_BOT_TOKEN)

client.on('ready', () => {
    console.log('MediaBot is online')
})