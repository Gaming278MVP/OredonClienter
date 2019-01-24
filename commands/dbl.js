const Discord = require("discord.js");
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUxOTMzMDQxODY0MjkxMTIzNyIsImJvdCI6dHJ1ZSwiaWF0IjoxNTQ1MTg4Mzk4fQ.uYriOBoJNFgitrVf9edd6_P-xME1bBSlSD19PHBBWsQ');

exports.run = async(client, msg, args) => {
if (!args[0]) {
  let embed = new RichEmbed()
  .setColor('RANDOM')
  .setTitle("<===== Tutorial ModLog Help =====>")
  .setDescription(`${oredon[msg.guild.id].prefix}modlog channel #channel \n${oredon[msg.guild.id].prefix}modlog on \n${oredon[msg.guild.id].prefix}modlog off \n \nExample: \n${oredon[msg.guild.id].prefix}modlog channel #logs`)
  
  msg.channel.send(embed); // Test dulu yah!
  } else if(args[0] == 'info') {
    let user;
    if (msg.mentions.members.first()) {
      user = msg.mentions.members.first();
    } else {
        user = msg.author;
}
  let id = msg.mentions.members.first().user.id;
  let dblBots = dbl.getBot(id) 
 
  let embed = new Discord.RichEmbed()
  .setAuthor(`Stats of ${dblBots.username}#${dblBots.discriminator}`, '<:discordbotlist:338808864352763904>')
  .setColor('RANDOM')
  .addField(` \`\`\`${dblBots.shortdesc}\`\`\` \n \n**Monthly Votes:** \n**Total Votes:** ${dblBots.points} \n**Lib:** ${dblBots.lib} \n**Prefix:** ${dblBots.prefix} \n **Tags:** ${dblBots.tags} **Certified:** ${dblBots.certifiedBot}`)
   msg.channel.send(embed);
  } else if(args[0] == 'widget') {
    let user;
    if (msg.mentions.members.first()) {
      user = msg.mentions.members.first();
    } else {
        user = msg.author;
}
  let id = msg.mentions.members.first().user.id;
  let dblBots = dbl.getBot(id)
  
  let embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor(`${dblBots.username}#${dblBots.discriminator}'s Widget`)
  .setImage(`https://discordbots.org/api/widget/${dblBots.id}.svg`)
  }
