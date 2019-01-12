const Discord = require("discord.js");

module.exports.run = (client, message, args) => {
  let embed = new Discord.RichEmbed()
  .setTitle("Oredon Clienter's Invite Links")
  .addField("🔗 Link", '**===============================**\n***Want Invite My Bot?***\n**Link:** [Click Here](https://discordapp.com/oauth2/authorize?client_id=519330418642911237&permissions=2146958839&scope=bot)')
  message.channel.send(embed);
}

module.exports.help = {
  name: "invite"
}