const Discord = require("discord.js");

exports.run = (client, message, args) => {
  let aTaged;
  if (message.mentions.users.first()) {
    aTaged = message.mentions.users.first();
  } else {
      aTaged = message.author;
  }
  
  let embed = new Discord.RichEmbed()
  .setTitle(`${aTaged.username}'s Avatar`)
  .setImage(aTaged.displayAvatarURL)
  message.channel.send(embed);
}

exports.conf = {
  aliases: [],
  cooldowns: '5'
}

exports.help = {
  name: "avatar"
}
// Let's test it out!
