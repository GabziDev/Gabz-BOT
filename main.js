const { Client, GatewayIntentBits } = require('discord.js');
const bot = new Client({ intents: [GatewayIntentBits.Guilds] });
const config = require('./config.json');


bot.on('ready', () => {
    console.log(`ℹ: Connecté en tant que ${bot.user.tag} !`);
});

bot.login(config.token);