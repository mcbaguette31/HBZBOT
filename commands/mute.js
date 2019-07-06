const { RichEmbed } = require("discord.js")
module.exports.run = async (bot, message, args) => {

message.delete()
if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("[HBZ] : Vous n'avez pas la permission. :spy:");
if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("[HBZ] : Vous n'avez pas la permission. :spy:")
let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
if(!mutee) return message.channel.send("[HBZ] : L'utilisateur est introuvable. :spy:");
let reason = args.join(" ").slice(22);
if(!reason) return message.channel.send("[HBZ] : Vous devez inscrire la raison du mute. :spy:");

let muterole = message.guild.roles.find(r => r.name === "Mute")
if(!muterole) {
    try{
        muterole = await message.guild.createRole({
            name: "Mute",
            color: "#514f48",
            permissions: []
        })
        message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
                SEND_TTS_MESSAGES: false,
                ATTACH_FILES: false,
                SPEAK: false
            })
        })
    } catch(e) {
        console.log(e.stack);
    }
}

mutee.addRole(muterole.id).then(() => {
    mutee.send(`[HBZ] : Vous êtes mute pour : ${reason}. :spy:`).catch(err => console.log(err))
    message.channel.send(`[HBZ] : L'utilisateur ${mutee.user.username} vient de se faire mute pour : ${reason}. :spy:`)
})

let muteEmbed = new RichEmbed()
    .setDescription(">mute")
    .setColor("#bc0000")
    .addField("Victime :", `${mutee.user.username} (ID : ${mutee.user.id})`)
    .addField("Auteur :", `<@${message.author.id}> (ID : ${message.author.id}`)
    .addField("Channel :", message.channel)
    .addField("Date :", message.createdAt.toLocaleString())
    .addField("Raison :", reason)

let sChannel = message.guild.channels.find(`name`, "𝕴𝖓𝖈𝖎𝖉𝖊𝖓𝖙𝖘『🔫』")
if(!sChannel) return message.channel.send("[HBZ] : Le channel #incidents est introuvable. :spy:");

sChannel.send(muteEmbed);
}
module.exports.help = {
    name:"mute"
}