module.exports = {
    run: (scheduler, client) => {
        scheduler.dailyReset(client);
        scheduler.pvp5Reset(client);
        scheduler.pvp11Reset(client);
        scheduler.updateCurrencyDB();
        //scheduler.testSchedule();
    }
};
