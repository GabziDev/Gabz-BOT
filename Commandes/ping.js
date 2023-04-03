const Discord = require("discord.js")
const config = require("../config.json")

module.exports = {

    name: "ping",
    description: "Affiche la latence",
    permission: "Aucune",
    dm: true,

    async run(bot, message, args) {
        let Embed = new Discord.EmbedBuilder()
            .setColor(config.color)
            .setTitle(`Latence du bot`)
            .setDescription(`\`${bot.ws.ping}\`**ms**`)
            .setTimestamp()
            .setFooter({ text: `${config.footer}`, iconURL: `${config.icon}` });

        await message.reply({embeds: [Embed]})
    }
}