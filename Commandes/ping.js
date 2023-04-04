const Discord = require('discord.js');
const os = require('os');
const config = require('../config.json');
const math = require('math');

module.exports = {

    name: "ping",
    description: "Affiche les informations du bot",
    permission: "Aucune",
    dm: true,

    async run(bot, message, args) {

        //Uptime du bot
        const uptime = bot.uptime;

        const jours = Math.floor(uptime / (1000 * 60 * 60 * 24));
        const heures = Math.floor(uptime / (1000 * 60 * 60) % 24);
        const minutes = Math.floor(uptime / (1000 * 60) % 60);
        const secondes = Math.floor(uptime / 1000 % 60);

        //Latences API discord et du bot
        const latenceApi = Math.round(bot.ws.ping);
        const latence = new Date().getTime() - message.createdTimestamp;

        //Ram
        const trString = os.totalmem();
        const urString = trString - os.freemem();
        const ramUsage = `${(urString / 1024 / 1024).toFixed(2)} MB / ${(trString / 1024 / 1024).toFixed(2)} MB`;

        //Contenu de la commande
        const tString = `**:black_small_square: Temps de connexion** : \`${jours}j, ${heures}h, ${minutes}m, ${secondes}s\``;
        const lbString = `**:black_small_square: Latence du bot** : \`${latence}ms\``;
        const ladString = `**:black_small_square: Latence API Discord** : \`${latenceApi}ms\``
        const vdString = `**:black_small_square: Version de discord.js** : \`v${Discord.version}\``;
        const vnString = `**:black_small_square: Version de node.js** : \`${process.version}\``;
        const sString = `**:black_small_square: Système** : \`${os.type()} ${os.release()}\``;
        const pString = `**:black_small_square: Processeur** : ${os.cpus()[0].model} ${os.cpus()[0].speed}MHz`;
        const rString = `**:black_small_square: RAM** : \`${ramUsage}\``;

        //Embed (t'as capté ...)
        let Embed = new Discord.EmbedBuilder()
            .setColor(config.color)
            .setTitle(`Informations du bot`)
            .setDescription(`${tString}\n${lbString}\n${ladString}\n${vdString}\n${vnString}\n${sString}\n${pString}\n${rString}`)
            .setTimestamp()
            .setFooter({ text: `${config.footer}`, iconURL: `${config.icon}` })

        await message.reply({embeds: [Embed]})
    }
}