const Discord = require("discord.js");
const fs = require("fs");
const config = require("../../config.json");

exports.run = (client, message, args) => {
  let oredon = JSON.parse(fs.readFileSync("../../oredon.json", "utf8"));
  if(!oredon[message.guild.id]){
     oredon[message.guild.id] = {
       prefix: config.bot_prefix
     }
  }
  
 let helpembed = new Discord.RichEmbed()
 .setColor('RANDOM')
 .setTitle("**Oredon Clienter's Command Help**")
 .setAuthor(`My prefix is ${oredon[message.guild.id].prefix}`, client.user.displayAvatarURL)
 .addField("⚒ Utility", '**Avatar, Ping, Say, BotInfo, ServerInfo, ServerRole, ServerEmoji, UserInfo, Help, Npm, Afk, Dbd, Sepia,**')
 .addField("⚠ Moderation", '**ModLog, Report, Clear, AutoRole, Prefix, Ban, Kick, Mute, Unmute,**')
 .addField("🎵 Music", '**Play, Queue, Stop, Skip, Np, Loop, Volume, Pause, Resume,**')
 .addField("🏁 Fun", '**Cat, Dog, Achievement, Slots, 8Ball,**')
 .addField("🔞 NSFW", '**Hentai, NewdNeko,**')
 .addField("⛑ Support Bot", '**Invite,**')
 .addField("🔒 Developer", '**Eval, Exec,**')
 
 message.channel.send(helpembed)
}

exports.conf = {
  aliases: [],
  cooldowns: '5'
}

exports.help = {
  name: "help"
}
