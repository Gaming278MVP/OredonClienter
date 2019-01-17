const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async(bot, message, args) => {
    
    message.delete()
    let {body} = await superagent
    .get(`https://nekos.life/api/v2/img/Random_hentai_gif`);
    if (!message.channel.nsfw) return message.reply("You can Use This Command In NSFW Channels :lock:");
  
    let hentaiEmbed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle("Hentai is art.")
    .setImage(body.url)
    .setColor("#ef1cb7")
    .setFooter("Bot Version: 0.0.3");

    message.channel.send(hentaiEmbed);

}

module.exports.help = {
    name: "hentai"
}