const Discord = require("discord.js");

exports.run = (client, message, args) => {
  let start = Date.now(); message.channel.send(':ping_pong: | Pong! ').then(message => { 
    let diff = (Date.now() - start); 
    let API = (client.ping).toFixed(2)
        
        let embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .addField(":ping_pong: Pong!", `\`${diff}ms\``, true)
        .addField("💻 API", `\`${API}ms\``, true)
        .setFooter('Bot Version 0.5.0', client.user.displayAvatarURL)
        message.channel.send(embed);
      
    });
}

exports.conf = {
  aliases: [],
  cooldowns: '5'
}

exports.help = {
  name: "ping"
}
