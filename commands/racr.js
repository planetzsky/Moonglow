const fs = require('fs');
exports.run = async (client, message, args) => {

  fs.readFile('./allowedGuildDB.json', 'utf8', async (err, data) => { // readFile method basically allows us to read the data in that file
    if (err !== null) { // Just an error checker
      return console.log(err);
    }
    else {
      const guildID = args[0];
      if (data.length === 0) { // So let's use this case when the file data is empty
        // So let's get the guild ID first. In eris, the arguments (Whatever follows the command name) is split by spaces, so it should be pretty easy to get the guild ID we need
        const requiredObject = {
          allowedGuildIDs: []
        };
        requiredObject.allowedGuildIDs.push(guildID);
        // After we push the data, we convert it to JSON
        const json = JSON.stringify(requiredObject);
        // And now we write the data to the same file
        fs.writeFile('./allowedGuildDB.json', json, 'utf8', (err) => {
          if (err !== null) {
            console.log(err);
          }
        });
        // Make sure you send message when this condition occurs too
      }
      else { // this case would mean that the file isn't empty
        const requiredData = JSON.parse(data);
        requiredData.allowedGuildIDs.push(guildID);
        // And now we write the final data again
        const json = JSON.stringify(requiredData);
        fs.writeFile('./allowedGuildDB.json', json, 'utf8', (err) => {
          if (err !== null) {
            console.log(err);
          }
                    
        });
        message.delete();
        message.channel.send(`✅ ***Moonglow has been activated on ${guildID} for <@!${args[1]}>***`);
        // I'm going to convert this over to discord.js really quick btw
        // Alright
      }
    }
  });    
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['confirm'],
  permLevel: 'Systems Support'
};
  
exports.help = {
  name: 'racr',
  category: 'System',
  description: 'Confirms server activation.',
  usage: 'racr [...server ID]'
};
