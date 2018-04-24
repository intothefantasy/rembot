const config = require("../../config.json");
const db = require('../../db/main.js');

module.exports = {
  run : (args, client, msg, isOwner) => {
      if(isOwner){
          msg.delete(config.messageDeleteTime);
          db.count().then(result =>
              console.log("Total Records in DB => "+result)
          );
      } else {
          return;
      }
  }
};
