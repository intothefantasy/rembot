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
      let currentElement;
      var cotd = [];

      $(".entry-content").find("h3").each(function() {

        currentElement = $(this);

        while (currentElement.next().length && currentElement.next().prop("tagName").indexOf("H") === -1) {
          if (currentElement.next().find("img[class=aligncenter]").length > 0) {
            cotd.push({
              title: $(this).text(),
              img: currentElement.next().find("img[class=aligncenter]").first().attr("src")
            });
          }

          currentElement = currentElement.next();
        }
      });
      cotd.forEach(function(cotd) {
        msg.reply(msg.channel.send({
          embed: {
            color: 3447003,
            description: "Weiss Schwarz COTD",
            "image": {
              "url": config.wsURL + "" + cotd.img
            },
            fields: [
              {
                name: "Title",
                value: cotd.title.toString()
              },
              {
              name: "Date",
              value: cotdDateFormat(cotd.img).toString()
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
