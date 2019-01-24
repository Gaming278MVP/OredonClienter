const Discord = require("discord.js");
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUxOTMzMDQxODY0MjkxMTIzNyIsImJvdCI6dHJ1ZSwiaWF0IjoxNTQ1MTg4Mzk4fQ.uYriOBoJNFgitrVf9edd6_P-xME1bBSlSD19PHBBWsQ');

exports.run = async(client, msg, args) => {
if (!args[0]) {
  let embed = new RichEmbed()
  .setColor('RANDOM')
  .setThumbnail(client.user.displayAvatarURL)
  .setTitle("Correct usage is:")
  .setDescription(`Use ${oredon[msg.guild.id].prefix}dbl <options> <@bot | botID> \n \n**Available options:** \n- info \n-widget \n \n**Note:** Please make sure the bot you mention is available on [Discord Bot List](https://discordbots.org) and yeah only bot!`)
  
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
