const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {

    name: "kick",
    description: "Expulse un utilisateur",
    permission: Discord.PermissionFlagsBits.KickMembers,
    dm: false,
    options: [
        {
            type: "user",
            name: "membre",
            description: "L'utilisateur à expulser",
            required: true,
            autocomplete: false
        }, {
            type:"string",
            name: "raison",
            description: "La raison",
            required: false,
            autocomplete: false
        }
    ],


    async run(bot, message, args) {

        //Expulser avec le pseudo
        let user = args.getUser("membre")
        if(!user) return message.reply("Aucun utilisateur sélectionné !")
        //Expulser avec l'ID
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Aucun utilisateur sélectionné !")

        //Expulser avec une raison
        let reason = args.getString("raison")
        if(!reason) reason = "Aucune raison fournie.";

        if(message.user.id === user.id) return message.reply("Vous ne pouvez pas vous expulser vous-même !")
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("Vous ne pouvez pas expulser le propriétaire du serveur !")
        if(member && !member?.kickable) return message.reply("Je ne peux pas kick ce membre !")
        if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Vous ne pouvez pas expulser ce membre !")

        //Message envoyé à l'utilisateur expulser :) (J'aime bien mettre des commentaires)
        try {await user.send(`Vous avez été expulsé du serveur **${message.guild.name}** par **${message.user.tag}**\n**Raison :** \`${reason}\``)} catch(err) {}

        //Message envoyé pour confirmer l'expulsion
        await message.reply(`**${message.user}** a expulsé **${user.tag}**\n**Raison :** \`${reason}\``)

        await member.kick(reason)
    }

}