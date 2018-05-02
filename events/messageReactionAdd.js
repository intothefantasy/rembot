const config = require("../config.json");

module.exports = {
    run: (reaction, client) => {
        if (reaction.emoji.name === "❓" && !client.user.bot) {
            console.log(reaction.users);
        }

    }
};
