const config = require('../config.json');

module.exports = {
  getBotStatus : function(){
    return config.botStatus[Math.floor(Math.random() * config.botStatus.length)];
  }
};
