const { Client, GatewayIntentBits } = require('discord.js');
const bot = new Client({ intents: [GatewayIntentBits.Guilds] });
const config = require('./config.json');
const runCommandes = require("./Run/runCommandes");
const runEvents = require("./Run/runEvents");

bot.login(config.token);
runCommandes(bot)
runEvents(bot)