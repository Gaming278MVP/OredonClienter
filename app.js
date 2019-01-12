const { ShardingManager } = require('discord.js');
const moment = require("moment-timezone");
const Discord = require("discord.js");
const { Client, Util, RichEmbed, Collection } = require("discord.js");
const client = new Client({
    disableEvents: [
],
  disableEveryone: true
})
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUxOTMzMDQxODY0MjkxMTIzNyIsImJvdCI6dHJ1ZSwiaWF0IjoxNTQ1MTg4Mzk4fQ.uYriOBoJNFgitrVf9edd6_P-xME1bBSlSD19PHBBWsQ', client);
const YouTube = require("simple-youtube-api");
const math = require('mathjs')
const config = require("./config.json");
const fs = require("fs");
const db = require("quick.db");
const tools = require("./functions.js");
const ytdl = require('ytdl-core');

client.snek = require('node-superfetch')
client.commands = fs.readdirSync('./commands');
client.aliases = {};

client.memory = new db.table("oredonmodlog")

const youtube = new YouTube(process.env.YOUTUBE);

for(const cmd of client.commands){
const file = require(`./commands/${cmd}`);
if(!file.conf || !file.conf.aliases) continue;
if(file.conf.aliases instanceof Array){
for(const al of file.conf.aliases){
client.aliases[al] = cmd;
    }
  }else{
client.aliases[file.conf.aliases] = cmd;
}
}

require("./server.js");

const queue = new Collection();
client.queue = queue;

function changing_status() {
  let status = [`Oredon Clienter | o!help`, `With ${client.users.size.toLocaleString()} users`, `With ${client.guilds.size.toLocaleString()} servers`, `With ${client.channels.size.toLocaleString()} channels`, `Launched Shard #${client.shard.id}`, `At ${moment().tz("Asia/Jayapura").format('LT')} WIT`]
  let random = status[Math.floor(Math.random() * status.length)]
  client.user.setActivity(random, {type: "STREAMING", url: 'https://www.twitch.tv/users'});
}


dbl.on('posted', () => {
  console.log('Server has been posted!');
})

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})

client.on('ready', () => {
  console.log('Ready A Function');
  setInterval(changing_status, 10000);
});
  
client.on("guildMemberAdd", async member => {
  let autoRole = await db.fetch(`autorole_${member.guild.id}`).catch(err => console.log(err));
  let autorole = member.guild.roles.get(autoRole);
  member.addRole(autorole);
})

client.on('message', async (message) => { // eslint-disable-line
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  
  let oredon = JSON.parse(fs.readFileSync("./oredon.json", "utf8"));
  if(!oredon[message.guild.id]){
     oredon[message.guild.id] = {
       prefix: config.bot_prefix
     }
  }
  
  if (message == `<@${client.user.id}>` || message == `<@!${client.user.id}>`) {
    let tagEmbed = new Discord.RichEmbed()
    .setThumbnail(client.user.displayAvatarURL) // ok!
    .setColor('RANDOM')
    .setTitle(`${client.user.username} Prefix`)
    .setDescription(`Global Prefix =  (**o!**) \nPrefix In This Server =  (**${oredon[message.guild.id].prefix}**)`);
    message.channel.send(tagEmbed);
}
  
  let prefix = oredon[message.guild.id].prefix;
  if(!message.content.startsWith(prefix)) return;
  var messageArray = message.content.split(" ");
  var args = message.content.slice(prefix.length).trim().split(' ');
  var searchString = messageArray.slice(1).join(' ');
  var url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
  console.log(searchString);
  var serverQueue = queue.get(message.guild.id);
  var sender = message.author;
  var cmd = args.shift().toLowerCase();
  
    try {
      if(client.aliases[cmd]){
				delete require.cache[require.resolve(`./commands/${client.aliases[cmd]}`)];
        require(`./commands/${client.aliases[cmd]}`).run(client, message, args);

      }else{

    delete require.cache[require.resolve(`./commands/${cmd}.js`)];

		let commandFile = require(`./commands/${cmd}.js`);
    commandFile.run(client, message, args);

      }

  } catch (e) {
    console.log(e.stack)                                                                  
  } finally {
   console.log(`${message.author.tag} used ${cmd} in shard ${client.shard.id} and guild ${message.guild.name} (${message.guild.id})`)
}
  
// Music Command
// ============================================================================================================================================

	if (cmd === 'play') {
		const voiceChannel = message.member.voiceChannel;
		if (!voiceChannel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
    if (!args[0]) return message.channel.send(`Please following the code! : ${oredon[message.guild.id].prefix}play **[Song Name/URL/Playlist URL]**`)
		const permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) {
			return message.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
		}
		if (!permissions.has('SPEAK')) {
			return message.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
		}
		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return message.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
					message.channel.send(`
__**Song selection:**__
${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
Please provide a value to select one of the search results ranging from 1-10.
					`);
					// eslint-disable-next-line max-depth
					try {
						var response = await message.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return message.channel.send('No or invalid value entered, cancelling video selection.');
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return message.channel.send('🆘 I could not obtain any search results.');
				}
			}
			return handleVideo(video, message, voiceChannel);
		}
	}
});
exports.handleVideo = handleVideo;
exports.queue = queue;

async function handleVideo(video, message, voiceChannel, playlist = false) {
	const serverQueue = queue.get(message.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
    uploaded: video.channel.title,
    authors: message.author,
    create: (video.publishedAt).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    voicechan: message.member.voiceChannel.name,
    durationmm: video.durationSeconds ? video.durationSeconds : video.duration / 1000,
    channel: `https://www.youtube.com/channel/${video.channel.id}`,
		url: `https://www.youtube.com/watch?v=${video.id}`,
    durationh: video.duration.hours,
    durationm: video.duration.minutes,
    durations: video.duration.seconds,
    duration: video.duration
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: message.channel,
      member: message.author,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 100,
			playing: true,
    loop: false,
		};
		queue.set(message.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(message.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			queue.delete(message.guild.id);
			return message.channel.send(`I could not join the voice channel: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
    
    var addedembed = new RichEmbed()
    .setColor('RANDOM')
    .setAuthor(`🎶 Added Queue:`)
    .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
    .setTitle(`${song.title}`, song.url)
    .addField("Duration:", `${require('./util.js').timeString(song.durationmm)}`, true)
    .addField('<:youtubers:529206401327955998> Uploaded by:', `[${song.uploaded}](${song.channel})`, true)
    .addField('Voice Channel:', song.voicechan, true)
    .addField('👤 Requested By:', song.authors.tag, true)
    .addField('Uploaded At:', song.create, true)
    .addField('Current Volume:', `${serverQueue.volume}%`, true)
    .setTimestamp();
    
		return message.channel.send(addedembed);
	}
	return undefined;
}

function play(guild, song, message) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url, { quality: 'highestaudio' }))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
      const shifed = serverQueue.songs.shift();
      if(serverQueue.loop) serverQueue.songs.push(shifed);
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);
  
  var playembed = new RichEmbed()
  .setColor('RANDOM')
  .setAuthor(`🎶 Start Playing:`)
  .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
  .setDescription(`**[${song.title}](${song.url})**`)
  .addField("Duration:", `${require('./util.js').timeString(song.durationmm)}`, true)
  .addField('<:youtubers:529206401327955998> Uploaded by:', `**[${song.uploaded}](${song.channel})**`, true)
  .addField('Voice Channel:', song.voicechan, true)
  .addField('👤 Requested By:', song.authors.tag, true)
  .addField('Uploaded At:', song.create, true)
  .addField('Current Volume:', `${serverQueue.volume}%`, true)
  .setTimestamp();
  
	serverQueue.textChannel.send(playembed);
}
// ============================================================================================================================================

client.login(process.env.TOKEN);