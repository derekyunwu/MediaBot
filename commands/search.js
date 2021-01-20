const ytsr = require('ytsr')

const options = {
    limit: 20
}

module.exports = {
    name: 'search',
    description: 'returns the first 3 results of query or returns the first occurrence',
    async execute(message, args) {

        if (args.length === 0) return message.reply("this is an invalid search query!")

        const result = await ytsr(args.join(), options)
            .catch(e => {
                msg.reply('looks like there was an error retrieving Youtube results')
            })
        
        const videos = result.items.filter(i => i.type === 'video')
        const length = videos.length

        if (!videos){
            return msg.reply('the Youtube search came up empty!')
        } else if (videos.length > 3) {
            const vid_list = `1. ${videos[0].title}\n` + `2. ${videos[1].title}\n` + `3. ${videos[2].title}`
            message.channel.send(vid_list)

            let filter = m => (
                (m.author.id === message.author.id) && 
                (parseInt(m.content)) &&
                (parseInt(m.content) >= 1 && parseInt(m.content) <= 3) 
            )
            
            
            let response = await message.channel.awaitMessages(filter, {max: 1, maxMatches: 1})

            message.channel.send(videos[response.first().content - 1].url)
        } else {
            message.channel.send(videos[0].url)
        }
    }
}