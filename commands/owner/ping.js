const config = require("../config.json");
module.exports = {
  run : (args, client, msg, isOwner) => {
     if(isOwner){
         msg.delete(config.messageDeleteTime);
         msg.reply("Pong!");
     } else {
         return;
     }
  }
};
