const { queue } = require("../app.js");

exports.run = async(client, msg, args) => {
  var serverQueue = queue.get(msg.guild.id);
  
  if (!serverQueue) return msg.channel.send('There is nothing playing.');
		return msg.channel.send(`🎶 Now Playing: **${serverQueue.songs[0].title}**`);
}

exports.conf = {
  aliases: ['nowplaying'],
  cooldown: "5"
}

exports.help = {
  name: "np"
}
