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

      console.log("img => "+$('div[class=entry-content]','h3').nextUntil('h4'));

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
