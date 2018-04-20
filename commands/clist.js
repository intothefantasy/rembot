const config = require("../config.json");
const moment = require('moment-timezone');
const db = require('../db/main.js');

module.exports = {
  run : (args, client, msg, isOwner) => {
      db.getOne().then(result =>
          msg.reply({
            embed: {
              color: 3447003,
              description: ":flag_my: Malaysia Currency Converter",
              fields: [{
                  name: "Last Update",
                  value: moment(result.date_time).format(config.readAbleFormatDate).toString()
                },
                {
                  name: ":flag_jp: JPY ",
                  value: parseFloat(result.jpy).toFixed(6).toString()
                },
                {
                  name: ":flag_us: USD",
                  value: parseFloat(result.usd).toFixed(3).toString()
                },
                {
                  name: ":flag_sg: SGD",
                  value: parseFloat(result.sgd).toFixed(3).toString()
                },
                {
                  name: ":flag_cn: CNY",
                  value: parseFloat(result.cny).toFixed(3).toString()
                },
                {
                  name: ":flag_tw: TWD",
                  value: parseFloat(result.twd).toFixed(4).toString()
                },
                {
                  name: ":flag_th: THB",
                  value: parseFloat(result.thb).toFixed(4).toString()
                },
                {
                  name: ":flag_au: AUD",
                  value: parseFloat(result.aud).toFixed(4).toString()
                }
              ],
              timestamp: new Date(),
              footer: {
                icon_url: client.user.avatarURL,
                text: "© remBot"
              }
            }
          })
      );
  }
};
