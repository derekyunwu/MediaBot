require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client()
const ytsr = require('ytsr')

const PREFIX = '!'
const query = {
    'scenes': 'mentalist best scenes',
    'soundtracks': 'mentalist soundtrack'
}
const options = {
    limit: 20
}

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
    
    if (CMD_NAME !== "search") return
    if (args.length === 0) return msg.reply("this is an invalid search query!")

    const result = await ytsr(args.join(), options)
        .catch(e => {
            msg.reply('looks like there was an error retrieving Youtube results')
        })
    
    const videos = result.items.filter(i => i.type === 'video')
    const length = videos.length

    const randomInt = Math.floor(Math.random() * length)
    const video = videos[randomInt]

    if (!video) return msg.reply('the Youtube search came up empty!')
    
    msg.channel.send(video.url)
})

client.login(process.env.DISCORDJS_BOT_TOKEN)