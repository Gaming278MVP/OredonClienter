const Discord = require("discord.js");

exports.run = async (client, msg, args) => {
  if(!msg.member.hasPermission("MUTE_MEMBERS")) return msg.channel.send({ embed: { color: 0xFF0000, description: 'You do not have permissions!'}});
  
  let toMute = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.get(args[0]);
  if(!toMute) return msg.channel.send(`<@${msg.author.id}>, You must supply mention member.`)
  
  if(toMute.id === msg.author.id) return msg.channel.send({ embed: { color: 0xFF0000, description: 'You cannot mute yourself!'}});
  if(toMute.highestRole.position >= msg.member.highestRole.position) return msg.channel.send({ embed: { color: 0xFF0000, description: "You can't mute the member!"}});
  
  
  let role = msg.guild.roles.find(r => r.name === "Muted");
  if(!role) {
  
  try {
      role = await msg.guild.createRole({
          name: "Muted",
          color: "#000000",
          permissions: []
      });
    
      msg.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(role, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false
          });
      });
    } catch (e) {
        console.log(e.stack);
    }
  }
  
  if(toMute.roles.has(role.id)) return msg.channel.send({ embed: { color: 0xFF0000, description: 'Member is already muted!'}});
  
  await toMute.addRole(role);
  msg.channel.send(`${toMute.user} has been Muted!`);
  
  return;
}

exports.conf = {
    aliases: [],
    cooldowns: '5'
}
  
exports.help = {
    name: "mute"
}
