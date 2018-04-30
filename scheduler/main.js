var CronJob = require('cron').CronJob;
const config = require('../config.json');
const currencyAPI = require('../currency_exchange/main.js');
const db = require('../db/main.js');
const botStatus = require('../bot_status/main.js');

module.exports = {
    dailyReset : function(client){
      new CronJob({
          cronTime: config.cronJobTimeForDailyReset,
          onTick: function() {
              client.channels.get(config.generalChatID).send(client.guilds.first().roles.find('name', config.azurLaneRole).toString() + " Daily/PVP 11pm reset now");
              console.log("Daily/PVP 11pm reset now");
          },
          start: true,
          timeZone: config.timeZone
      });
    },

    pvp5Reset : function(client){
      new CronJob({
          cronTime: config.cronJobTimeForPvP5Reset,
          onTick: function() {
              client.channels.get(config.generalChatID).send(client.guilds.first().roles.find('name', config.azurLaneRole).toString() + " PVP 5pm reset now");
              console.log("PVP 5pm reset now");
          },
          start: true,
          timeZone: config.timeZone
      });
    },

    pvp11Reset : function(client){
      new CronJob({
          cronTime: config.cronJobTimeForPvP11Reset,
          onTick: function() {
              client.channels.get(config.generalChatID).send(client.guilds.first().roles.find('name', config.azurLaneRole).toString() + " PVP 11am reset now");
              console.log("PVP 11am reset now");
          },
          start: true,
          timeZone: config.timeZone
      });
    },

    night9PMQuest : function(client){
      new CronJob({
          cronTime: config.cronJobTimeForNight9PMQuest,
          onTick: function() {
              client.channels.get(config.generalChatID).send(client.guilds.first().roles.find('name', config.azurLaneRole).toString() + " 9pm quest resets now");
              console.log("9pm quest resets now");
          },
          start: true,
          timeZone: config.timeZone
      });
    },

    night9PMQuestLastCall : function(client){
      new CronJob({
          cronTime: config.cronJobTimeForNight9PMQuestLastCall,
          onTick: function() {
              client.channels.get(config.generalChatID).send(client.guilds.first().roles.find('name', config.azurLaneRole).toString() + " 9pm quest last call 30mins left");
              console.log("9pm quest last call 30mins left");
          },
          start: true,
          timeZone: config.timeZone
      });
    },

    randomBotStatusUpdate : function(client){
      new CronJob({
          cronTime: config.cronJobTimeForUpdateBotStatus,
          onTick: function() {
              let newBotStatus = botStatus.getBotStatus();
              client.user.setActivity(newBotStatus);
              console.log("updated bot status = "+newBotStatus);
          },
          start: true,
          timeZone: config.timeZone
      });
    },

    updateCurrencyDB : function(){
      new CronJob({
          cronTime: config.cronJobTimeForUpdateCurrencyDB,
          onTick: function() {
             currencyAPI.getLatestUpdate(function(result){
                 db.insert(result).then(lastid => {
                     console.log("sucessful insert : "+lastid);
                 });
             });
          },
          start: true,
          timeZone: config.timeZone
      });
  },

  testSchedule : function(){
    new CronJob({
        cronTime: "00 17 13 * * 1-7",
        onTick: function() {
          console.log("test scheduler run successful");
        },
        start: true,
        timeZone: config.timeZone
    });
  }


}; // end of module.exports
