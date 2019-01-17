const Discord = require("discord.js");

exports.run = (client, msg, args) => {
  let embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setTitle(`${client.user.username}'s Invite Link`)
  .setDescription('==================== \n**[Invite Me!](https://discordapp.com/oauth2/authorize?client_id=519330418642911237&permissions=2146958839&scope=bot)** \n====================')
  msg.channel.send(embed);
}

exports.conf = {
    aliases: [],
    cooldowns: '5'
}

exports.help = {
  name: "invite"
}

//the code is stop in here
