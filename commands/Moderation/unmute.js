exports.run = async (client, msg, args) => {
    if (!msg.member.hasPermission("MUTE_MEMBERS")) return msg.channel.send({ embed: { color: 0xFF0000, description: 'You do not have permissions!'}});

    let toMute = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.get(args[0]);
    if(!toMute) return msg.channel.send(`<@${msg.author.id}>, You must supply mention member.`)
  
    let role = msg.guild.roles.find(r => r.name === "Muted");
  
    if(!role || !toMute.roles.has(role.id)) return msg.channel.send({ embed: { color: 0xFF0000, description: 'Member is not muted!'}});
  
    await toMute.removeRole(role);
    msg.channel.send(`${toMute.user} has been unmuted!`);
  
    return;
}

exports.conf = {
    aliases: [],
    cooldowns: '5'
}

exports.help = {
    name: "unmute"
}
