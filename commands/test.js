const config = require("../config.json");
const snekFetch = require('snekfetch');
const cheerio = require('cheerio');

module.exports = {
  run : (args, Client, msg, isOwner) => {
     if(isOwner){
      snekFetch.get("https://ws-tcg.com/todays-card/").then((result) => {
        let $ = cheerio.load(result.text);
        //console.log($('img[class=aligncenter]').attr('src'));
        const img = [];

        $('img[class=aligncenter]').each(function(i, elem) {
          img[i] = $(this).attr('src');
        });
        console.log(img);
      });
     } else {
         return;
     }
  }
};
