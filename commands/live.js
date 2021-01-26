const axios = require('axios')
const discord = require('discord.js')
require('dotenv').config()

module.exports = {
    name: 'live',
    description: 'allows user to add streamers to a server-wide Twitch watchlist',
    async execute(message, args) {
        //attempt twitch api call
        var streamer_tag = 'seagull'
        var response = await axios.get(`https://api.twitch.tv/helix/search/channels?query=${streamer_tag}&&first=5`, {
            headers: {
                'client-id': `${process.env.TWITCH_CLIENT_ID}`,
                'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
            }
        }).catch(e => {
            message.reply("There was an error retrieving this information.")
            console.log(e)
            return
        })

        if (!response) {
            message.reply('No streamers found.')
        } else {
            var items_list = ""
            for(var i = 0; i < response.data.data.length; i++){
                items_list += `${i+1}. ${response.data.data[i].display_name}\n`
            }
            items_list += `${response.data.data.length + 1}. not found above`

            message.channel.send(items_list)

            let filter = m => (
                (m.author.id === message.author.id) && 
                (parseInt(m.content)) &&
                (parseInt(m.content) >= 1 && parseInt(m.content) <= response.data.data.length + 1) 
            )

            let choice = await message.channel.awaitMessages(filter, {max: 1, maxMatches: 1})
            var selection = parseInt(choice.first().content)

            if (selection - 1 === response.data.data.length) {
                choice.first().reply('Try a more specific streamer tag for better results')
            } else {
                choice.first().reply(`${response.data.data[selection - 1].display_name} has been added to the server Twitch watchlist!`)
            }

        }
        

    }
}