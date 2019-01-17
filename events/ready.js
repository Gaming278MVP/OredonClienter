const { ShardingManager } = require("discord.js");
const moment = require("moment-timezone");

module.exports = client => {
  function changing_status() {
  let status = [`Oredon Clienter | o!help`, `With ${client.users.size.toLocaleString()} users`, `With ${client.guilds.size.toLocaleString()} servers`, `With ${client.channels.size.toLocaleString()} channels`, `Launched Shard #${client.shard.id}`, `At ${moment().tz("Asia/Jayapura").format('LT')} WIT`]
  let random = status[Math.floor(Math.random() * status.length)]
  client.user.setActivity(random, {type: "STREAMING", url: 'https://www.twitch.tv/users'});
}
  
  console.log('Ready A Good Function');
  setInterval(changing_status, 10000);
}