// Require Package
const { Client, RichEmbed, MessageEmbed, Util } = require("discord.js");//
const fs = require('fs');

// Package Database
const db = require("quick.db");
const config = require("../config.json");
// End of Require Package

// Create a first command,
exports.run = async(client, msg, args, member) => {
  let oredon = JSON.parse(fs.readFileSync("../oredon.json", "utf8"));
  if(!oredon[msg.guild.id]){ 
      oredon[msg.guild.id] = {
       prefix: config.bot_prefix
     }
  }
  
  if(!msg.member.hasPermission('MANAGE_GUILD')) return msg.channel.send({ embed: { color: 0xFF0000, description: 'You do not have permissions!'}});

if (!args[0]) {
  let embed = new RichEmbed()
  .setColor('RANDOM')
  .setTitle("<===== Tutorial ModLog Help =====>")
  .setDescription(`${oredon[msg.guild.id].prefix}modlog channel #channel \n${oredon[msg.guild.id].prefix}modlog on \n${oredon[msg.guild.id].prefix}modlog off \n \nExample: \n${oredon[msg.guild.id].prefix}modlog channel #logs`)
  
  msg.channel.send(embed); // Test dulu yah!

  } else if(args[0] == 'on') { // Mod log Enable/ !modlog on
     client.memory.set(`ModLog.${msg.guild.id}.on`, true)
     msg.channel.send(`<:toggleon:534669824811466762> Modlog has been enabled!`);
  } else if(args[0] == 'off') {
     client.memory.set(`ModLog.${msg.guild.id}.on`, false)
     msg.channel.send(`<:toggleoff:534669799695843337> Modlog has been disabled!`);
  } else if(args[0] == 'channel') {
    var channel = msg.mentions.channels.first();
    
    if(!channel) return msg.channel.send("Please specify a mention channels!")
    
     client.memory.set(`ModLog.${msg.guild.id}.channel`, channel.id).then(ModLog => {
        msg.channel.send(`Succesfully Set Modlog To <#${ModLog}>`) 
    })
  }                                                                     
}
// End of code modlog

exports.help = {
  name: "modlog",
  description: "send a log from moderation command!"
}

// gimana kalo beda file
