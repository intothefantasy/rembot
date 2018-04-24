const config = require("../config.json");

module.exports = {
    run: (reaction, user) => {
        console.log(reaction.message.id);
    }
};
