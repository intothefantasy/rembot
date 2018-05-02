const config = require("../config.json");

module.exports = {
    run: (reaction, client) => {
        if (!reaction.message.author.bot) {
            console.log(reaction.users);
        }

    }
};
