const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.delete()
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("[HBZ] : Vous n'avez pas la permission. :spy:");
    if(args[0] == "help"){
      message.reply("Utilisation : >ban [@UTILISATEUR] [RAISON]");
      return;
    }
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("[HBZ] : L'utilisateur est introuvable. :spy:");
    let bReason = args.join(" ").slice(22);
    if(!bReason) return message.channel.send("[HBZ] : Vous devez inscrire la raison du ban. :spy:");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("[HBZ] : Cet utilisateur ne peut pas être ban. :spy:");
    bUser.send(`[HBZ] : Vous êtes ban pour : ${bReason}. :spy:`).catch(err => console.log(err))
    message.channel.send(`[HBZ] : L'utilisateur ${bUser} vient de se faire ban pour ${bReason}. :spy:`)

    let banEmbed = new Discord.RichEmbed()
    .setDescription(">ban")
    .setColor("#bc0000")
    .addField("Victime :", `${bUser} (ID : ${bUser.id})`)
    .addField("Auteur :", `<@${message.author.id}> (ID : ${message.author.id})`)
    .addField("Channel :", message.channel)
    .addField("Dâte :", message.createdAt.toLocaleString())
    .addField("Raison :", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "𝕴𝖓𝖈𝖎𝖉𝖊𝖓𝖙𝖘『🔫』");
    if(!incidentchannel) return message.channel.send("[HBZ] : Le channel #incidents est introuvable. :spy:");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);
}

module.exports.help = {
  name:"ban"
}