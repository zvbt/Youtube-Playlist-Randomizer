'use strict'
const fs = require('fs')

module.exports = function obs(mainWindow) {
  
  let title = mainWindow.getTitle()

  let music1 = title.split(' "').pop();
  let music2 = music1.split('" ').shift();
  let number1 = title.split(' ~ ').pop()
  let number2 = number1.split(' of').shift()
  let music = music2 + " " + number2

  if (title.match("YTPLR")) {
    fs.writeFileSync('./obs/title.txt', music2)
    fs.writeFileSync('./obs/title & list.txt', music)
    fs.writeFileSync('./obs/list.txt', number2)
  } 
};