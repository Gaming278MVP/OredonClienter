const Discord = require("discord.js");
const superagent = require("superagent");

exports.run = async(bot, message, args) => {
 
  let {body} = await superagent
  .get('https://aws.random.cat/meow');
  
  let catembed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setTitle('Suprise The Cat!')
  .setImage(body.file);
  
  message.channel.send(catembed);
}

exports.conf = {
 aliases: [],
 cooldowns: '5'
}

exports.help = {
  name: "cat"
}
