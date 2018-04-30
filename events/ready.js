const botStatus = require('../bot_status/main.js');
module.exports = {
  run : client => {
      let newBotStatus = botStatus.getBotStatus();
      client.user.setActivity((newBotStatus));
      console.log(`Ready to serve on ${client.guilds.size} servers, for ${client.users.size} users. (`+newBotStatus+`)`);
  }
};
