const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Vous n'avez pas la permission. :spy:");
  if(!args[0]) return message.channel.send("[HBZ] Vous devez inscrire un nombre de messages à supprimer. :spy:");
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`[HBZ] ${args[0]} message(s) ont été supprimé. :spy:`).then(msg => msg.delete(5000));
  });
}

module.exports.help = {
  name: "clear"
}