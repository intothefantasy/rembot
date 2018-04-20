const config = require("../config.json");
const snekFetch = require('snekfetch');
const cheerio = require('cheerio');

module.exports = {
  run : (args, Client, msg, isOwner) => {
     if(isOwner){
      snekFetch.get("https://ws-tcg.com/todays-card/").then((result) => {
        let $ = cheerio.load(result.text);
        console.log($('img[class=aligncenter]').attr('src'));
      });
     } else {
         return;
     }
  }
};
