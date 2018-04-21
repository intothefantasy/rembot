const config = require("../config.json");
const snekFetch = require('snekfetch');
const cheerio = require('cheerio');
const moment = require('moment-timezone');

function cotdDateFormat(imgURL) {
  let date = imgURL.substring(imgURL.lastIndexOf('/') + 1, imgURL.lastIndexOf('_'));
  //console.log("convert date => "+moment.tz(date, config.timeZone).format(config.cotdDateFormat));
  //console.log("convert date => "+date);
  return moment.tz(date, config.timeZone).format(config.cotdDateFormat);
}

module.exports = {
  run: (args, client, msg, isOwner) => {
    snekFetch.get(config.cotdURL).then((result) => {
      let $ = cheerio.load(result.text);
      const img = [];
/*
      $('div[class=entry-content]').find('h3').each(function(i, elem) {
        //console.log("test "+i+" => "+$(this).next().find("img").attr('src'));
        let h3 = $(this);
        h3.next().find("img").each(function () {
          console.log("h3 = "+h3+" img => "+$(this).attr('src'));
        });
      });

let currentElement, data = {};

$(".entry-content").find("h3").each(function () {
    data[$(this).text()] = [];

    currentElement = $(this);

    while(currentElement.next().$('h3').index("H") === -1) {
        if (currentElement.next().find("img").length > 0) {
            data[$(this).text()].push(currentElement.next().find("img").first().attr("src"));
        }

        currentElement = currentElement.next();
    }
});
console.log(data);

*/

$(".entry-content").find("h3").each(function () {
    let h3 = $(this);

    console.log(h3.nextAll('img[class=aligncenter]').attr('src'));
});


      $('img[class=aligncenter]').each(function(i, elem) {
        img[i] = $(this).attr('src');
      });
      img.forEach(function(imgURL) {
        msg.reply(msg.channel.send({
          embed: {
            color: 3447003,
            description: "Weiss Schwarz COTD",
            "image": {
              "url": config.wsURL + "" + imgURL
            },
            fields: [{
              name: "Date",
              value: cotdDateFormat(imgURL).toString()
            }],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© remBot"
            }
          }
        }));
      });
    });
  }
};
