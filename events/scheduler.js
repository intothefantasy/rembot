module.exports = {
    run: (scheduler, client) => {
        scheduler.dailyReset(client);
        scheduler.pvp5Reset(client);
        scheduler.pvp11Reset(client);
        scheduler.night9PMQuest(client);
        scheduler.randomBotStatusUpdate(client);
        scheduler.night9PMQuestLastCall(client);
        scheduler.yytCardTracking(client);
        scheduler.updateCurrencyDB();
        //scheduler.testSchedule();
    }
};
