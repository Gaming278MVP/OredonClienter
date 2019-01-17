const { queue } = require("../../app.js");

exports.run = async(client, msg, args) => {
  var serverQueue = queue.get(msg.guild.id);
  
  if (serverQueue && serverQueue.playing) {
      if (!msg.member.voiceChannel) return msg.channel.send('<:WrongMark:524375774741135362> You are not in a voice channel!');
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send('⏸ Paused the music for you!');
		}
    return msg.channel.send("⚠ There is nothing playing.");
}

exports.conf = {
    aliases: [],
    cooldowns: '5'
}

exports.help = {
  name: "pause"
}
