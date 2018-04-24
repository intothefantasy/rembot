const config = require("../config.json");
const fs = require('fs');

function checkFileOwner(filename){
    fs.open("../commands/owner/"+filename+".js", 'r', (err, fd) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.error('myfile does not exist');
      return false;
    }

    throw err;
  }
    return true;
});
}

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
            console.log(checkFileOwner(cmd));
            require("../commands/" + cmd).run(args, Client, msg, isOwner);
        } catch (err) {
            console.log(err);
        }
    }
};
