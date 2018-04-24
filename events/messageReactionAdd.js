const config = require("../config.json");

module.exports = {
    run: (reaction, user) => {
        if (reaction.emoji.name === "❓") {
            console.log(reaction.users.username);
        }

    }
};
