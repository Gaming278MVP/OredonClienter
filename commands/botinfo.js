const Discord = require("discord.js");
const moment = require("moment");
const m = require("moment-duration-format");
let os = require('os')

exports.run = (client, msg, args) => {
  let days = Math.floor(client.uptime / 86400000);
  let hours = Math.floor(client.uptime / 3600000) % 24;
  let minutes = Math.floor(client.uptime / 60000) % 60;
  let seconds = Math.floor(client.uptime / 1000) % 60;  
  
  msg.channel.send(`
= **STATISTICS** = 
• Bot        :: ${client.user.tag} 
• Developer  :: MesaRadar12 | FaiqGamingYT
• Credits    :: Thanks CEO Cha Soo Hyun#1945 ServerRoles & ServerEmoji!
• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB
• Uptime     :: ${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds
• Users      :: ${client.users.size.toLocaleString()} 
• Servers    :: ${client.guilds.size}
• Channels   :: ${client.channels.size.toLocaleString()}
• Discord.js :: v11.4.2
• Node       :: v10.14.2
• Platform   :: Linux
• Arch       :: x64
`, {code: 'AsciiDoc'})
}//

exports.conf = {
  aliases: [],
  cooldowns: '5'
}

exports.help = {
  name: "botinfo"
}
