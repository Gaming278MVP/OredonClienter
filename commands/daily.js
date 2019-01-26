const db = require('quick.db');
const fs = require("fs");
var ms = require('parse-ms');
let balance = require("../database/balance.json");

exports.run = async(client, message, args, color) => {
  if (message.channel.type == "dm") return;  
  
  if(!balance[message.author.id]){
    balance[message.author.id] = {
      balance: 0
    };
  }
  
  let curcoins = balance[message.author.id].balance;
  
  
    let cooldown = 8.64e+7,
    amount = 200
  
  let lastdaily = await db.fetch(`lastDaily_${message.author.id}`)
  if (lastdaily !== null && cooldown - (Date.now() - lastdaily) > 0) {
        let timeObj = ms(cooldown - (Date.now() - lastdaily))
        let eh = require('../handle/cooldownAns.json');
        let ops = eh[Math.floor(Math.random() * eh.length)];
        message.channel.send(`**${message.author.username}**, ${ops} (Ratelimited)\n**You'll be able to collect your next daily in ${timeObj.hours} hours, ${timeObj.minutes} minutes and ${timeObj.seconds} seconds**`)
    } else  {
        db.set(`lastDaily_${message.author.id}`, Date.now());        
          balance[message.author.id].balance = curcoins + amount;
    
          fs.writeFile("./database/balance.json", JSON.stringify(balance, null, 2), (err) => {
          message.channel.send(`**${message.author.username}, collected daily 💴 ${amount} balance**`);
          })
  } 
}

exports.conf = {
    aliases: [],
    cooldown: "3"
}

exports.help = {
    name: 'daily',
    description: 'To get your daily everyday',
    usage: 'daily'
}
