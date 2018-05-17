const config = require("../../config.json");
const db = require('../../db/main.js');
const currencyAPI = require('../../currency_exchange/main.js');

module.exports = {
  run : (args, client, msg, isOwner) => {
      if(isOwner){

        console.log(client.users.get("name", "RoryRemMercury").toString());
        /*
          msg.channel.send({
            embed: {
              color: 3447003,
              description: "test menu help",
              fields: [
                {
                  name: "1",
                  value: "help"
                },
                {
                name: "2",
                value: "help 2"
              }],
              timestamp: new Date(),
              footer: {
                icon_url: client.user.avatarURL,
                text: "© remBot"
              }
            }
        }).then(function (message) {
            message.react("❓");
        });


        msg.delete(config.messageDeleteTime);
        currencyAPI.getLatestUpdate(function(result){
          console.log(result);
        });
        */
      } else {
          return;
      }
  }
};
