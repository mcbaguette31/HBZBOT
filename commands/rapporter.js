const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const red = botconfig.red;
const green = botconfig.green;
const orange = botconfig.orange;

module.exports.run = async (bot, message, args) => {

    if(args[0] == "help"){
      message.reply("Utilisation : >rapporter [@UTILISATEUR] [RAISON]");
      return;
    }
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("[HBZ] L'utilisateur est introuvable. :spy:");
    let rreason = args.join(" ").slice(22);
    if(!rreason) return message.channel.send("[HBZ] : Vous devez inscrire la raison du report. :spy:");

    let reportEmbed = new Discord.RichEmbed()
    .setDescription(">rapporter")
    .setColor("#bc0000")
    .addField("Victime :", `${rUser} (ID : ${rUser.id})`)
    .addField("Auteur :", `${message.author} (ID : ${message.author.id})`)
    .addField("Channel :", message.channel)
    .addField("Dâte :", message.createdAt.toLocaleString())
    .addField("Raison :", rreason);

    let reportschannel = message.guild.channels.find(`name`, "𝕴𝖓𝖈𝖎𝖉𝖊𝖓𝖙𝖘『🔫』");
    if(!reportschannel) return message.channel.send("[HBZ] Le channel #incidents est introuvable. :spy:");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

}

module.exports.help = {
  name: "rapporter"
}