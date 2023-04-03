const Discord = require("discord.js")

module.exports = async bot => {

    console.log(`🤖 ${bot.user.tag} est en ligne !`)

    const activities = [
        { name: `Salut 1`, type: 3 }
        { name: `Salut 2`, type: 3 },
        { name: `Salut 3`, type: 0 }
    ];
    const status = [
        'online'
    ];
    let i = 0;
    setInterval(() => {
        if(i >= activities.length) i = 0
        bot.user.setActivity(activities[i])
        i++;
    }, 5000);

    let s = 0;
    setInterval(() => {
        if(s >= activities.length) s = 0
        bot.user.setStatus(status[s])
        s++;
    }, 30000);
}