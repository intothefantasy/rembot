const config = require("../config.json");

module.exports = {
    run: (reaction, client) => {
        if (reaction.emoji.name === "❓") {
            console.log(reaction);
        }

    }
};
