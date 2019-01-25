// Require Packages
const Discord = require("discord.js");
const DBL = require("dblapi.js");
const dbl = new DBL(process.env.DBLAPI);
const config = require("../config.json")
const fs = require("fs");
const colorMaping =
{
  "true": "<:dblCertified:392249976639455232>",
  "false": "Here is no"
} 

const colorMap = 
{
    "undefined": "None"
}

// Start of codes
exports.run = async(client, msg, args) => {
  let oredon = JSON.parse(fs.readFileSync("./oredon.json", "utf8"));
  if(!oredon[msg.guild.id]){ 
      oredon[msg.guild.id] = {
       prefix: config.bot_prefix
     }
}
  
// Start of Help DBL Commands
if (!args[0]) {
  let embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setThumbnail(client.user.displayAvatarURL)
  .setTitle("Correct usage is:")
  .setDescription(`Use ${oredon[msg.guild.id].prefix}dbl <options> <@bot | botID> \n \n**Available options:** \n- info \n- widget \n \n**Note:** Please make sure the bot you mention is available on [Discord Bot List](https://discordbots.org) and yeah only bot!`)
  
  msg.channel.send(embed);
// Commands of DBL Info
  } else if(args[0] == 'info') {
  let user;
  if (msg.mentions.members.first()) {
    user = msg.mentions.members.first();
  } else {
    user = msg.author;
}
  // Variables
  let id = msg.mentions.members.first().user.id;
  let avatar = msg.mentions.members.first().user.displayAvatarURL;
  let dblBots = await dbl.getBot(id)
  
  if(dblBots.server_count === undefined) dblBots.server_count = 'None'
  dblBots.github ? dblBots.github : 'No Github Repository'
  dblBots.website ? dblBots.website : 'No Website'
  dblBots.support ? dblBots.support : 'No Support Server'
   
   // Created of codes
   let embed = new Discord.RichEmbed()
  .setAuthor(`Stats of ${dblBots.username}#${dblBots.discriminator}`, 'https://images-ext-2.discordapp.net/external/NUQ1frynEtUDB_-ByRw_NBdTl0sVeNacGQogqRLZ77Y/https/cdn.discordapp.com/emojis/393548363879940108.gif')
  .setThumbnail(avatar)
  .setColor('RANDOM')
  .setDescription(` \`\`\`${dblBots.shortdesc}\`\`\` \n \n**Monthly Votes:** ${dblBots.monthlyPoints} \n**Total Votes:** ${dblBots.points} \n**Lib:** ${dblBots.lib} \n**Prefix:** ${dblBots.prefix} \n**Tags:** ${dblBots.tags.join(', ')} \n**Certified:** ${colorMaping[dblBots.certifiedBot]} \n**Posted Guild Count:** ${dblBots.server_count} \n \n[Discord Bot List Page](https://discordbots.org/bot/${dblBots.id}) | [Invite](${dblBots.invite}) | [Support Server](https://discord.gg/${dblBots.support}) | [Github Repository](${dblBots.github}) | [Website](${dblBots.website})`)
  .setFooter('Credits DBL | Powered By: Discord Bot List', 'https://images-ext-2.discordapp.net/external/1eA2X2zC7-8RAkK8d-VRE_jCyeXxe1MvLPqNDDVKorM/https/cdn.discordapp.com/emojis/376811626197811200.png')
  msg.channel.send(embed);
// Commands of DBL Widget
  } else if(args[0] == 'widget') {
  let user;
  if (msg.mentions.members.first()) {
    user = msg.mentions.members.first();
  } else {
    user = msg.author;
}
  // Variables
  let id = msg.mentions.members.first().user.id;
  let avatar = msg.mentions.members.first().user.displayAvatarURL;
  let dblBots = await dbl.getBot(id) 
  
  // Created of codes
  let embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor(`${dblBots.username}#${dblBots.discriminator}'s Widget`)
  .setImage(`https://discordbots.org/api/widget/${dblBots.id}.png`)
  msg.channel.send(embed);
  }
}
