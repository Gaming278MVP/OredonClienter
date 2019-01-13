const Discord = require("discord.js");

exports.run = (client, msg, args) => {
  let embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setTitle(`${client.user.username}'s Invite Link`)
  .setDescription('==================== \n**[Invite Me!](https://discord.now.sh/511890934460317697)** \n====================')
  msg.channel.send(embed);
}

//the code is stop in here