const config = require("../../config.json");
const db = require('../../db/main.js');
const currencyAPI = require('../../currency_exchange/main.js');
const snekFetch = require('snekfetch');
const cheerio = require('cheerio');

module.exports = {
    run: (args, client, msg, isOwner) => {
        if (isOwner) {
            for (let i = 0; i < config.yuyuteiTrackingURL.length; i++) {
                setTimeout(function() {
                    snekFetch.get(config.yuyuteiTrackingURL[i]).then((result) => {
                        let $ = cheerio.load(result.text);

                        let yytURL = config.yuyuteiTrackingURL[i];
                        let yytImg = $('.image_box').find('img').first().attr('src');
                        let yytCardName = $('.image_box').find('img').first().attr('alt');
                        let yytPrice = $('.price_box').find('p[class=price]').text().replace(/\s+/g, '');
                        let yytStock = $('.price_box').find('p[class=stock]').text().replace(/\s+/g, '');
                        let yytOutOfStock = $('.price_box').find('p[class=cart] input[type="image"]').prop('disabled'); // true or false

                        if(!yytOutOfStock) {
                            let cardStatus = "";

                            if(config.yuyuteiTrackingURL[i].indexOf("&kizu=1") > -1) {
                                cardStatus = "Damaged";
                            } else {
                                cardStatus = "New";
                            }


                            client.users.get(config.ownerID).send({
                              embed: {
                                color: 3447003,
                                description: yytCardName,
                                "image": {
                                  "url": config.yytURL + "" + yytImg
                                },
                                fields: [
                                  {
                                    name: "Card URL",
                                    value: yytURL
                                  },
                                  {
                                    name: "Card Price",
                                    value: yytPrice
                                  },
                                  {
                                  name: "Card Stock",
                                  value: yytStock
                                }],
                                timestamp: new Date(),
                                footer: {
                                  icon_url: client.user.avatarURL,
                                  text: "© remBot"
                                }
                              }
                            });

                            msg.reply(msg.channel.send({
                              embed: {
                                color: 3447003,
                                description: yytCardName,
                                "image": {
                                  "url": config.yytURL + "" + yytImg
                                },
                                fields: [
                                  {
                                    name: "Card URL",
                                    value: yytURL
                                  },
                                  {
                                    name: "Card Price",
                                    value: yytPrice
                                  },
                                  {
                                  name: "Card Stock",
                                  value: yytStock
                                }],
                                timestamp: new Date(),
                                footer: {
                                  icon_url: client.user.avatarURL,
                                  text: "© remBot"
                                }
                              }
                            }));
                        } else {
                            //client.users.get(config.ownerID).send("No Stock");
                        }
                    });
                }, 1000);
            }

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
