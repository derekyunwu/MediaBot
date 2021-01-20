const ytsr = require('ytsr')

const options = {
    limit: 20
}

module.exports = {
    name: 'randomsearch',
    description: 'takes in args after command and uses them as a query for a random youtube search result',
    async execute(message, args) {

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
    
        message.channel.send(video.url)
    }
}