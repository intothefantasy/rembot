const config = require("../config.json");
const fs = require('fs');

function checkFileOwner(filename){
    try
   {
       return fs.statSync("./commands/owner/"+filename+".js").isFile();
   }
   catch (err)
   {
       console.log(err);
       return false;
   }
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
            if(checkFileOwner(cmd)){
                if(isOwner){
                    require("../commands/owner/" + cmd).run(args, Client, msg, isOwner);
                } else {
                    return;
                }
            } else{
                require("../commands/" + cmd).run(args, Client, msg, isOwner);
            }
        } catch (err) {
            console.log(err);
        }
    }
};
