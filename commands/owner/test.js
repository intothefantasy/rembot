const config = require("../../config.json");
const db = require('../../db/main.js');
const currencyAPI = require('../../currency_exchange/main.js');
const snekFetch = require('snekfetch');
const cheerio = require('cheerio');

module.exports = {
  run : (args, client, msg, isOwner) => {
      if(isOwner){
          snekFetch.get("https://yuyu-tei.jp/game_ws/carddetail/cardpreview.php?VER=lbext1.0&CID=10010&MODE=sell").then((result) => {
               let $ = cheerio.load(result.text);
               console.log($('.image_box').find('p[class=image] img').attr('src'));
               console.log($('.price_box').find('p[class=price]').text().replace(/\s+/g, ''));
               console.log($('.price_box').find('p[class=stock]').text().replace(/\s+/g, ''));
               console.log($('.price_box').find('p[class=cart] input[type="image"]').prop('disabled'));
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
