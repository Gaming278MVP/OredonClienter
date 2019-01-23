const Discord = require("discord.js");
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUxOTMzMDQxODY0MjkxMTIzNyIsImJvdCI6dHJ1ZSwiaWF0IjoxNTQ1MTg4Mzk4fQ.uYriOBoJNFgitrVf9edd6_P-xME1bBSlSD19PHBBWsQ');

exports.run = async(client, msg, args) => {
  let id = message.mentions.users.first();
  let dblBots = dbl.getBots(id)
  
  let embed = new Discord.RichEmbed()
  .setAuthor(`Stats of ${dblBots.username}`, '<:discordbotlist:338808864352763904>')
  .setColor('RANDOM')
  .addField(` \`\`\`${dblBots.shortdesc}\`\`\` \n \n**Monthly Votes:** \n**Total Votes:** ${dblBots.points} \n**Lib:** ${dblBots.lib} \n**Prefix:** ${{dblBots.prefix} \n **Tags:** ${dblBots.tags} **Certified:** ${dblBots.certifiedBot}`)
}
