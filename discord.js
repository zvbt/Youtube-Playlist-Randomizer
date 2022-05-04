'use strict'
const discordClient = require('discord-rich-presence')('970872145288769566'); 

let connected = false;
discordClient.on('error', err => {
  console.log(`Error: ${err}`);
});
discordClient.on("connected", () => {
  connected = true;
});

module.exports = function discord(mainWindow) {
  
    let title = mainWindow.getTitle()

  const music1 = title.split(' "').pop();
  const music2 = music1.split('" ').shift();
  const number1 = title.split(' ~ ').pop()
  const number2 = number1.split(' of').shift()

      if (title.match("YTPLR")) {
        discordClient.updatePresence({
          details: music2,
          state: number2,
          largeImageKey: 'ytpr',
          largeImageText: 'Youtube Playlist Randomizer',
          smallImageKey: 'none',
          instance: false,
        });
      }
     

    
};