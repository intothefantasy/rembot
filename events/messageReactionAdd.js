const config = require("../config.json");

module.exports = {
    run: (reaction, client) => {
        if (reaction.emoji.name === "❓") {
            reaction.users.foreach((item) => {
              console.log(item);
            });
        }

    }
};
