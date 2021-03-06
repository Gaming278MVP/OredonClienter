const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const db = require("quick.db");

exports.run = async(client, msg, args) => {
  
  let kickTaged = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
  let reason = args.slice(1).join(' ');
  let channeltarget = await client.memory.fetch(`ModLog.${msg.guild.id}.channel`)
  let channelmark = await client.memory.fetch(`ModLog.${msg.guild.id}.on`)
  
  if (!channeltarget) return msg.channel.send("Please You must set modlog channel!");
  if (!channelmark) return msg.channel.send("Please turn on modlog!");
  
if (channelmark == true) {
  let logs = msg.guild.channels.get(channeltarget);
  
  if (!msg.member.hasPermissions("KICK_MEMBERS")) return msg.channel.send({ embed: { color: 0xFF0000, description: 'You do not have permissions!'}});
  
  if (!kickTaged) return msg.channel.send(`<@${msg.author.id}>, You must supply mention member.`);
  if (!reason) return msg.channel.send(`<@${msg.author.id}>, You must supply a reason.`);
  
  let embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setThumbnail(kickTaged.user.displayAvatarURL)
  .addField("Action:", 'Kick', true)//
  .addField("User:", `${kickTaged.user.username}#${kickTaged.user.discriminator}`, true)
  .addField("Moderator:", `${msg.author.username}#${msg.author.discriminator}`, true)
  .addField("Reason:", reason, true)
  .setTimestamp()
  .setFooter(`• Kick User Information`, kickTaged.user.displayAvatarURL);
  
  msg.channel.send(`${kickTaged.user.username} has been Kicked by ${msg.author} Beacuse: ${reason}`);
  kickTaged.kick(reason);
  logs.send(embed);  
} else {
  return msg.channel.send("You do not set modlog channel you must set it!")
}
};

exports.conf = {
  aliases: [],
  cooldowns: '5'
}

exports.help = {
  name: "kick"
}
// Let's test it out!
