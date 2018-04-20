function load_event(event) {
    return require("../events/" + event);
}

module.exports = {
    run: (scheduler, client) => {
        module.exports.runDiscord(client);
        module.exports.runScheduler(scheduler, client);
    },
    runDiscord: client => {
        //client.on("message", msg => { load_event("message").run(msg, client); });
        client.on("ready", () => {
            load_event("ready").run(client);
        });
        client.on("message", msg => {
            load_event("message").run(msg, client);
        });
    },
    runScheduler: (scheduler, client) => {
        load_event("scheduler").run(scheduler, client);
    }
};
