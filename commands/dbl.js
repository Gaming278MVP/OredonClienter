const Discord = require("discord.js");
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUxOTMzMDQxODY0MjkxMTIzNyIsImJvdCI6dHJ1ZSwiaWF0IjoxNTQ1MTg4Mzk4fQ.uYriOBoJNFgitrVf9edd6_P-xME1bBSlSD19PHBBWsQ');
const config = require("../config.json")
const fs = require("fs");
const colorMaping =
{
  "false": "Here is no",
  "true": "<:dblCertified:392249976639455232>"
} 

exports.run = async(client, msg, args) => {
  let oredon = JSON.parse(fs.readFileSync("./oredon.json", "utf8"));
  if(!oredon[msg.guild.id]){ 
      oredon[msg.guild.id] = {
       prefix: config.bot_prefix
     }
}

if (!args[0]) {
  let embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setThumbnail(client.user.displayAvatarURL)
  .setTitle("Correct usage is:")
  .setDescription(`Use ${oredon[msg.guild.id].prefix}dbl <options> <@bot | botID> \n \n**Available options:** \n- info \n- widget \n \n**Note:** Please make sure the bot you mention is available on [Discord Bot List](https://discordbots.org) and yeah only bot!`)
  
  msg.channel.send(embed); // Will be send
  } else if(args[0] == 'info') {
    let user;
    if (msg.mentions.members.first()) {
      user = msg.mentions.members.first();
    } else {
        user = msg.author;
}
  let id = msg.mentions.members.first().user.id;
  let dblBots = await dbl.getBot(id)
  
  let mem = require("util").inspect(dblBots)
 
  let embed = new Discord.RichEmbed()
  .setAuthor(`Stats of ${dblBots.username}#${dblBots.discriminator}`)
  .setThumbnail(mem.displayAvatarURL)
  .setColor('RANDOM')
  .setDescription(` \`\`\`${dblBots.shortdesc}\`\`\` \n \n**Monthly Votes:** ${dblBots.monthlyPoints} \n**Total Votes:** ${dblBots.points} \n**Lib:** ${dblBots.lib} \n**Prefix:** ${dblBots.prefix} \n**Tags:** ${dblBots.tags} \n**Certified:** ${colorMaping[dblBots.certifiedBot]} \n**Posted Guild Count:** ${dblBots.server_count} \n**Posted Shard Count:** ${dblBots.shards} \n \n[Discord Bot List Page](https://discordbots.org/bot/${dblBots.id}) | [Invite](${dblBots.invite}) | [Support Server](https://discord.gg/${dblBots.support}) | [Github Repository](${dblBots.github}) | [Website](${dblBots.website})`)
   msg.channel.send(embed);

  } else if(args[0] == 'widget') {
    let user;
    if (msg.mentions.members.first()) {
      user = msg.mentions.members.first();
    } else {
        user = msg.author;
}
  let id = msg.mentions.members.first().user.id;
  let dblBots = await dbl.getBot(id)
  
  let embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor(`${dblBots.username}#${dblBots.discriminator}'s Widget`)
  .setImage(`https://discordbots.org/api/widget/${dblBots.id}.png`)
  msg.channel.send(embed);
  }
}
