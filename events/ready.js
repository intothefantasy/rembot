const botStatus = require('../bot_status/main.js');
module.exports = {
  run : client => {
      client.user.setActivity(botStatus.getBotStatus());
      console.log(`Ready to serve on ${client.guilds.size} servers, for ${client.users.size} users.`);
  }
};
