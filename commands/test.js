const config = require("../config.json");
const snekFetch = require('snekfetch');
const cheerio = require('cheerio');

module.exports = {
  run: (args, Client, msg, isOwner) => {
    if (isOwner) {
      msg.delete(config.messageDeleteTime);
      snekFetch.get("https://ws-tcg.com/todays-card/").then((result) => {
        let $ = cheerio.load(result.text);
        const img = [];

        $('img[class=aligncenter]').each(function(i, elem) {
          img[i] = $(this).attr('src');
        });
        img.forEach(function(imgURL) {
          msg.reply(config.cotdURL+""+imgURL);
        });
      });
    } else {
      return;
    }
  }
};
