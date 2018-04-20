const Discord = require("discord.js");
const client = new Discord.Client();
const scheduler = require('./scheduler/main.js');
require('./wake.js');

require("./event_loader/main.js").run(scheduler,client);

client.login(process.env.TOKEN);
