const db = require("quick.db"); // npm i quick.db

exports.run = (client, message, args) => {
  let roles = message.mentions.roles.first();
  
  if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send({ embed: { color: 0xFF0000, description: 'You do not have permissions!'}});
  if (!roles) return message.channel.send("Please provide a mention roles!");

  db.get(`autorole_${message.guild.id}`, roles.id).then(autorole => {
    message.channel.send(`Succesfully Set AutoRole To Role <@&${autorole}>`)
  })
}

exports.conf = {
  aliases: [],
  cooldowns: '5'
}

exports.help = {
  name: "autorole"
}
