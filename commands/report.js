const Discord = require("discord.js");

exports.run = async(client, message, args) => {
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!rUser) return message.channel.send("Couldn't find the User!");
  let reason = args.join(" ").slice(22);
  let channeltarget = await client.memory.get(`ModLog.${message.guild.id}.channel`)
  let channelmark = await client.memory.get(`ModLog.${message.guild.id}.on`)
  
  let reportEmbed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setThumbnail(rUser.user.displayAvatarURL)
  .addField("Action:", 'Report', true)//
  .addField("User:", `${rUser.user.username}#${rUser.user.discriminator}`, true)
  .addField("Moderator:", `${message.author.username}#${message.author.discriminator}`, true)
  .addField("Reason:", reason, true)
  .setTimestamp()
  .setFooter(`• Report User Information`, rUser.user.displayAvatarURL);
  
    if (!channeltarget) return message.channel.send("Please You must set modlog channel!");
    if (!channelmark) return message.channel.send("Please turn on modlog!");

if (channelmark == true) {  
  let reportsChannel = message.guild.channels.get(channeltarget);
  
  message.delete().catch(O_o=>{});
  reportsChannel.send(reportEmbed);
} else {
  return message.channel.send("You do not set modlog channel you must set it!")
}
}

exports.conf = {
    aliases: [],
    cooldowns: '5'
}

exports.help = {
  name: "report"
}
