const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  
  message.delete()
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.channel.send("[HBZ] : L'utilisateur est introuvable. :spy:");
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("[HBZ] : Vous n'avez pas la permission. :spy:");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.channel.send("[HBZ] : Cet utilisateur ne peut pas être mute. :spy:");

  let muterole = message.guild.roles.find(`name`, "Mute");
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Mute",
        color: "#514f48",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          SEND_TTS_MESSAGES: false,
          ATTACH_FILES: false,
          SPEAK: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  let mutetime = args[1];
  if(!mutetime) return message.channel.send("[HBZ] : Vous devez inscrire le temps du mute. :spy:");

  await(tomute.addRole(muterole.id));
  tomute.send(`[HBZ] : Vous êtes mute une durée de : ${ms(ms(mutetime))} :spy:`).catch(err => console.log(err))
  message.channel.send(`[HBZ] : L'utilisateur @${tomute.user.username} vient de se faire mute pour une durée de : ${ms(ms(mutetime))}. :spy:`);

  let tempmuteEmbed = new Discord.RichEmbed()
  .setDescription(">tempmute")
  .setColor("#bc0000")
  .addField("Victime :", `${tomute.user.username} (ID : ${tomute.user.id})`)
  .addField("Auteur :", `<@${message.author.id}> (ID : ${message.author.id}`)
  .addField("Channel :", message.channel)
  .addField("Date :", message.createdAt.toLocaleString())
  .addField("Durée :", mutetime)

let tmpChannel = message.guild.channels.find(`name`, "𝕴𝖓𝖈𝖎𝖉𝖊𝖓𝖙𝖘『🔫』")
if(!tmpChannel) return message.channel.send("[HBZ] : Le channel #incidents est introuvable. :spy:");

tmpChannel.send(tempmuteEmbed);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`[HBZ] : L'utilisateur @${tomute.user.username} vient de se faire unmute (AUTOMATIQUEMENT). :spy:`);
  }, ms(mutetime));
}

module.exports.help = {
  name: "tempmute"
}
