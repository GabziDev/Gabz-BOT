const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {

    name: "help",
    description: "Affiche les commandes du bot",
    permission: "Aucune",
    dm: false,

    async run(bot, message, args) {

        //Affichage de toutes les commandes disponibles

        //Embed (t'as capté ...)
        let Embed = new Discord.EmbedBuilder()
            .setColor(config.color)
            .setTitle(`Commandes du bot`)
            .setDescription(`Bientôt ....`)
            .setTimestamp()
            .setFooter({ text: `${config.footer}`, iconURL: `${config.icon}` })

        await message.reply({embeds: [Embed]})
    }
}