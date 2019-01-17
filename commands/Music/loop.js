const { queue } = require("../app.js");

exports.run = (client, msg ,args) => {
  const serverQueue = queue.get(msg.guild.id);
  if (!msg.member.voiceChannel) return msg.channel.send('<:WrongMark:524375774741135362> You are not in a voice channel!');
  if(!serverQueue) return msg.channel.send('⚠ There is nothing playing.');
  if(serverQueue.voiceChannel.id !== msg.member.voiceChannelID) return msg.channel.send(`Hey, ${msg.author.tag}. You must be in **${serverQueue.voiceChannel.name}** To Loop Queue!`);
  serverQueue.loop = !serverQueue.loop;
  client.queue.set(msg.guild.id, serverQueue);
  if(serverQueue.loop) return msg.channel.send('🔁 Loop current queue!');
  return msg.channel.send('🔁 Unloop current queue!');
}

exports.conf = {
    aliases: [],
    cooldowns: '5'
}

exports.help = {
  name: "loop"
}
