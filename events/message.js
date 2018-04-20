const config = require("../config.json");

module.exports = {
    run: (msg, Client) => {
        let isOwner = false;

        if (!msg.content.startsWith(config.prefix) || msg.author.bot) {
            return;
        }
        if (msg.member.displayName === config.ownerName) {
            isOwner = true;
        }

        let cmd = msg.content.split(" ")[0].substr(config.prefix.length);
        let args = msg.content.split(" ").slice(1);
        try {
            require("../commands/" + cmd).run(args, Client, msg, isOwner);
        } catch (err) {
            console.log(err);
        }
    }
};
