const Discord = require("discord.js")
const ms = require("ms")

module.exports = {

    name: "mute",
    description: "Mute un utilisateur",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    options: [
        {
            type: "user",
            name: "membre",
            description: "L'utilisateur à mute",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "temps",
            description: "Le temps du mute",
            required: true,
            autocomplete: false,
            choices: [
                {
                    name: "5 minutes",
                    value: "5m"
                },
                {
                    name: "1 heure",
                    value: "1h"
                },
                {
                    name: "12 heures",
                    value: "12h"
                },
                {
                    name: "1 jour",
                    value: "1d"
                },
                {
                    name: "1 semaine",
                    value: "1w"
                },
                {
                    name: "1 mois",
                    value: "1mo"
                }
            ]
        }, {
            type: "string",
            name: "raison",
            description: "La raison",
            required: false,
            autocomplete: false
        },
    ],

    async run(bot, message, args) {

        let user = args.getUser("membre")
        if(!user) return message.reply("Aucun utilisateur sélectionné !")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Aucun utilisateur sélectionné !")

        let time = args.getString("temps")
        if(!time) return message.reply("Aucun temps sélectionné !")
        if(isNaN(ms(time))) return message.reply("Pas le bon format !")
        if(ms(time) > 2332800000) return message.reply("Le mute ne peut pas durer plus de 27 jours !")

        let reason = args.getString("raison")
        if(!reason) reason = "Aucune raison fournie.";

        if(message.user.id === user.id) return message.reply("Vous ne pouvez pas vous mute vous-même !")
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("Vous ne pouvez pas mute le propriétaire du serveur !")
        if(!member.moderatable) return message.reply("Je ne peux pas mute ce membre !")
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Vous ne pouvez pas mute ce membre !")
        if(member.isCommunicationDisabled()) return message.reply("Ce membre est déjà mute !")

        try {await user.send(`Vous avez été mute du serveur **${message.guild.name}** par **${message.user.tag}**\n**Raison :** \`${reason}\`\n**Durée :** \`${time}\``)} catch(err) {}

        await message.reply(`**${message.user}** a mute **${user.tag}**\n**Raison :** \`${reason}\`\n**Durée :** \`${time}\``)

        await member.timeout(ms(time), reason)
    }
}