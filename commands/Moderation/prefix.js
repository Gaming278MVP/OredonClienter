const Discord = require("discord.js");
const fs = require("fs");

exports.run = async(client, message, args) => {
  if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You don't have permissions to set prefix!");
  if(!args[0]) return message.channel.send("Please specify a prefix!");
  
  let oredon = JSON.parse(fs.readFileSync("./oredon.json", "utf8"));
  oredon[message.guild.id] = {
    prefix: args[0]
  }
  
  fs.writeFile("./oredon.json", JSON.stringify(oredon), (err) => {
     if(err) console.log(err);
  })
  
  message.channel.send(`Prefix has been set to ${args[0]}`);
}