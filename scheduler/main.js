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
              client.channels.get(config.generalChatID).send(client.guilds.first().roles.find('name', config.azurLaneRole).toString() + " "+config.cronJobTimeMsgForDailyReset);
              console.log(config.cronJobTimeMsgForDailyReset);
          },
          start: true,
          timeZone: config.timeZone
      });
    },

    pvp5Reset : function(client){
      new CronJob({
          cronTime: config.cronJobTimeForPvP5Reset,
          onTick: function() {
              client.channels.get(config.generalChatID).send(client.guilds.first().roles.find('name', config.azurLaneRole).toString() + " "+config.cronJobTimeMsgForPvP5Reset);
              console.log(config.cronJobTimeMsgForPvP5Reset);
          },
          start: true,
          timeZone: config.timeZone
      });
    },

    pvp11Reset : function(client){
      new CronJob({
          cronTime: config.cronJobTimeForPvP11Reset,
          onTick: function() {
              client.channels.get(config.generalChatID).send(client.guilds.first().roles.find('name', config.azurLaneRole).toString() + " "+config.cronJobTimeMsgForPvP11Reset);
              console.log(config.cronJobTimeMsgForPvP11Reset);
          },
          start: true,
          timeZone: config.timeZone
      });
    },

    night9PMQuest : function(client){
      new CronJob({
          cronTime: config.cronJobTimeForNight9PMQuest,
          onTick: function() {
              client.channels.get(config.generalChatID).send(client.guilds.first().roles.find('name', config.azurLaneRole).toString() + " "+config.cronJobTimeMsgForNight9PMQuest);
              console.log(config.cronJobTimeMsgForNight9PMQuest);
          },
          start: true,
          timeZone: config.timeZone
      });
    },

    night9PMQuestLastCall : function(client){
      new CronJob({
          cronTime: config.cronJobTimeForNight9PMQuestLastCall,
          onTick: function() {
              client.channels.get(config.generalChatID).send(client.guilds.first().roles.find('name', config.azurLaneRole).toString() + " "+config.cronJobTimeMsgForNight9PMQuestLastCall);
              console.log(config.cronJobTimeMsgForNight9PMQuestLastCall);
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

    getDailyForOwner : function(client){
      new CronJob({
          cronTime: config.cronJobTimeForOwnerDaily,
          onTick: function() {
            client.message.send(config.tatsumakiDailyCommand+" <@"+config.ownerID+">");
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
