// Require Packages of Data.
const Discord = require("discord.js");

// Exports of to runnings.
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

// Exports of to configure.
exports.conf = {
  aliases: [],
  cooldowns: '5'
}

// Exports of to helping.
exports.help = {
  name: "avatar"
}
// Let's test it out!
