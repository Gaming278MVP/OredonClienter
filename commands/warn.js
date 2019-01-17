const Discord = require('discord.js');
exports.run = (client, message, args) => {
  let oredon = JSON.parse(fs.readFileSync("./oredon.json", "utf8"));
  if(!oredon[message.guild.id]){
     oredon[message.guild.id] = {
       prefix: config.bot_prefix
     }
}
    var embedColor = '#FAFF00' // Change this to change the color of the embeds!
    
    var missingArgsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the command isnt run right
        .setColor(embedColor)
        .setTitle('<:WrongMark:524375774741135362> Missing Arguments!')
        .setDescription(`Usage: \`${oredon[message.guild.id].prefix}warn [@User] [Reason]\``)
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("<:WrongMark:524375774741135362> You don't have permissions to warn member!"); // Checks if the user has the permission
    let mentioned = message.mentions.users.first(); // Gets the user mentioned!
    if(!mentioned) return message.channel.send(missingArgsEmbed); // Triggers if the user donsn't tag a user in the message
    let reason = args.slice(1).join(' ') // .slice(1) removes the user mention, .join(' ') joins all the words in the message, instead of just sending 1 word
    if(!reason) return message.channe.send(missingArgsEmbed); // Triggers if the user dosn't provide a reason for the warning

    var warningEmbed = new Discord.RichEmbed() // Creates the embed that's DM'ed to the user when their warned!
        .setColor(embedColor)
        .setTitle(`<:scaryrabbit:467816313205686292> You've been warned in ${message.guild.name}!`)
        .addField('Warned by', message.author.tag)
        .addField('Reason:', reason)
        .setTimestamp();
    mentioned.send(warningEmbed); // DMs the user the above embed!
    message.channel.send('<:scaryrabbit:467816313205686292> :thumbsup: User Successfully Warned!');
    message.delete();
}
