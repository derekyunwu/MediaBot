require('dotenv').config()

const Discord = require('discord.js')
const fs = require('fs')
const client = new Discord.Client()

client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`../commands/${file}`);
	client.commands.set(command.name, command);
}

const PREFIX = '!'

client.on('ready', () => {
    console.log('MediaBot is online')
})

client.on('message', async msg => {
    if (msg.author.bot) return
    if (!msg.content.startsWith(PREFIX)) return

    const [CMD_NAME, ...args] = msg.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/)

    if (!client.commands.has(CMD_NAME)) return

    try {
        client.commands.get(CMD_NAME).execute(msg, args)
    } catch (err){
        msg.reply('an error occurred while executing that instruction!')
    }
})

client.login(process.env.DISCORDJS_BOT_TOKEN)