const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.delete()
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("[HBZ] : L'utilisateur est introuvable. :spy:");
    let kReason = args.join(" ").slice(22);
    if(!kReason) return message.channel.send("[HBZ] : Vous devez inscrire la raison du kick. :spy:");
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("[HBZ] : Vous n'avez pas la permission. :spy:");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("[HBZ] : Cet utilisateur ne peut pas être kick. :spy:");
    kUser.send(`[HBZ] : Vous êtes kick pour : ${kReason}. :spy:`).catch(err => console.log(err))
    message.channel.send(`[HBZ] : L'utilisateur ${kUser} vient de se faire kick pour : ${kReason}. :spy:`)

    let kickEmbed = new Discord.RichEmbed()
    .setDescription(">kick")
    .setColor("#bc0000")
    .addField("Victime :", `${kUser} (ID : ${kUser.id})`)
    .addField("Auteur :", `<@${message.author.id}> (ID : ${message.author.id})`)
    .addField("Channel :", message.channel)
    .addField("Dâte :", message.createdAt.toLocaleString())
    .addField("Raison :", kReason);

    let kickChannel = message.guild.channels.find(`name`, "𝕴𝖓𝖈𝖎𝖉𝖊𝖓𝖙𝖘『🔫』");
    if(!kickChannel) return message.channel.send("[HBZ] : Le channel #incidents est introuvable. :spy:");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);
}

module.exports.help = {
  name:"kick"
}