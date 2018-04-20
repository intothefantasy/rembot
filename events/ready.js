const config = require('../config.json');
module.exports = {
  run : client => {
      client.user.setActivity(config.botActivity);
      console.log(`Ready to serve on ${client.guilds.size} servers, for ${client.users.size} users.`);
  }
};
