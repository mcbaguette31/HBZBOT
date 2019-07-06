const botconfig = require("./botconfig.json");
const prefix = botconfig.prefix;
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();


fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("./commands > 0 commandes disponible.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} [ON]`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} est en ligne sur ${bot.guilds.size} serveur(s) !`);
  bot.user.setActivity("Hobbaz.fr", {type: "PLAYING"});

});

bot.on('guildMemberAdd', function (member) {
    let embed = new Discord.RichEmbed()
        .setDescription(':heavy_plus_sign: **' + member.user.username + "** à rejoint Hobbaz.fr")
        .setFooter('Il y a actuellement ' + member.guild.memberCount + ' membres.')
    member.guild.channels.get('592983568981164033').send(embed)
    member.addRole('592983568981164033')
})

bot.on('guildMemberRemove', function (member) {
    let embed = new Discord.RichEmbed()
        .setDescription(':heavy_minus_sign: **' + member.user.username + '** a quitté Hobbaz.fr')
        .setFooter('Nous sommes désormais ' + member.guild.memberCount)
    member.guild.channels.get('586644036291526669').send(embed)
})

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  if(message.content.startsWith(prefix)){

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);
}});

bot.on('guildMemberAdd', member => {
member.createDM().then(channel => {
return channel.send('Salutation **' + member.displayName + '** !'
+ '\nRetrouve la liste de mes fonctionnalités avec la commande "**>aide**"')
}).catch(console.error)
})

bot.login("")