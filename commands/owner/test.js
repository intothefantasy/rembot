const config = require("../../config.json");
const db = require('../../db/main.js');
const db1 = require('../../db/beta.js');
const currencyAPI = require('../../currency_exchange/main.js');
const moment = require('moment-timezone');

module.exports = {
    run: (args, client, msg, isOwner) => {
        if (isOwner) {
            console.log(msg.author.id);
            console.log(msg.author.username);
            console.log(msg.author.presence);

          db1.getOneResult().then(result => {
            console.log(moment(result.date_time).format(config.readAbleFormatDate).toString());
            console.log(result.jpy);
          });
            /*
            msg.channel.send("<@"+config.ownerID+">");

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
