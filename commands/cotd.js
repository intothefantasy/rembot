const config = require("../config.json");
const snekFetch = require('snekfetch');
const cheerio = require('cheerio');
const moment = require('moment-timezone');

module.exports = {
  run: (args, client, msg, isOwner) => {
    snekFetch.get(config.cotdURL).then((result) => {
      let $ = cheerio.load(result.text);
      const img = [];

      $('img[class=aligncenter]').each(function(i, elem) {
        img[i] = $(this).attr('src');
      });
      img.forEach(function(imgURL) {
        msg.reply(msg.channel.send({
          embed: {
            color: 3447003,
            description: "Weiss Schwarz COTD",
            "image": {
              "url": config.wsURL+""+imgURL
            },
            fields: [{
              name: "Date",
              value: moment().tz(config.timeZone).format(config.dbFormatDate).toString()
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
