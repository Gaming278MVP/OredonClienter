const fs = require("fs");
const config = require("../config.json")

async function embedSan(embed) {
  embed.message ? delete embed.message : null;
  embed.footer ? delete embed.footer.embed : null;
  embed.provider ? delete embed.provider.embed : null;
  embed.thumbnail ? delete embed.thumbnail.embed : null;
  embed.image ? delete embed.image.embed : null;
  embed.author ? delete embed.author.embed : null;
  embed.fields ? delete embed.fields.forEach(f => {delete f.embed;}) : null;
  return embed;
}

exports.run = async(client, msg, args) => {
  let oredon = JSON.parse(fs.readFileSync("./oredon.json", "utf8"));
  if(!oredon[msg.guild.id]){ 
      oredon[msg.guild.id] = {
       prefix: config.bot_prefix
     }
  }
  
  let channeltarget = await client.memory.fetch(`ModLog.${msg.guild.id}.channel`)
  let channelmark = await client.memory.fetch(`ModLog.${msg.guild.id}.on`)
  
  if (!channeltarget) return msg.channel.send("Please You must set modlog channel!");
  if (!channelmark) return msg.channel.send("Please turn on modlog!");

if (channelmark == true) {
  const modlog = client.channels.get(channeltarget);
  const caseNumber = args.shift();
  const newReason = args.join(' ');
  
  await modlog.fetchMessages({limit:100}).then((msgs) => {
    const caseLog = msgs.filter(m => m.author.id === client.user.id &&
      m.embeds[0] &&
      m.embeds[0].type === 'rich' &&
      m.embeds[0].footer &&
      m.embeds[0].footer.text.startsWith('Case') &&
      m.embeds[0].footer.text === `Case ${caseNumber}`
    ).first();
    modlog.fetchMessages(caseLog.id).then(logMsg => {
      const embed = logMsg.embeds[0];
      embedSan(embed)
      embed.description = embed.description.replace(`Awaiting moderator's input. Use ${oredon[msg.guild.id].prefix}reason ${caseNumber} [reason].`, newReason);
      logMsg.edit({embed});
    });
  });
};

};