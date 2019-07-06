const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setTitle("**Liste des fonctionnalités :**")
    .setColor("#00ff00")
    .setThumbnail(bicon)
    .addField(":record_button:  >aide", `Affiche la liste des fonctionnalités.`)
    .addField(":record_button:  >stats", `Les caractéristiques du serveur hébergeur.`)
    .addField(":record_button:  >ping", `Affiche la latence du serveur.`)
    .addField(":record_button:  >clear NOMBRE", `Efface une quantitée de messages voulu.`)
    .addField(":record_button:  >kick @UTILISATEUR RAISON", `Kick un utilisateur.`)
    .addField(":record_button:  >ban @UTILISATEUR RAISON", `Bannir un utilisateur.`)
    .addField(":record_button:  >rapporter @UTILISATEUR RAISON", `Report un utilisateur.`)
    .addField(":record_button:  >mute @UTILISATEUR @RAISON", `Mute un utilisateur.`)
    .addField(":record_button:  >tempmute @UTILISATEUR TEMPS", `Mute un utilisateur pour un laps de temps.`)
    .addField(":record_button:  >botmessage MESSAGE", `Faire parler le bot à votre place.`)
    .setFooter("Kiwcy#6490 ~ Hobbaz.fr")

    message.channel.send(botembed);
}

module.exports.help = {
  name:"aide"
}
