const config = require("../config.json");
const db = require('../db/main.js');
const currencyAPI = require('../currency_exchange/main.js');

module.exports = {
  run : (args, client, msg, isOwner) => {
      if(isOwner){
        msg.delete(config.messageDeleteTime);
        currencyAPI.getLatestUpdate(function(result){
          console.log(result);
        });
      } else {
          return;
      }
  }
};
