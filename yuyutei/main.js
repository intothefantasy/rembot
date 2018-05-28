const config = require('../config.json');
const snekFetch = require('snekfetch');
const cheerio = require('cheerio');

module.exports = {
  yuyuteiCardTracker : function(client){
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
                              name: "Card Condition",
                              value: cardStatus
                          },
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
                } else {
                    //client.users.get(config.ownerID).send("No Stock");
                    console.log(yytCardName+" no stock");
                }
            });
        }, 1000);
    }
  }
};
