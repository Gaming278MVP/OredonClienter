const fetch = require("superagent");
      fetch.get(`https://spiffy-lock.glitch.me/`).set('user-agent', 'official-pinger/1.0.0').then(x => x);
    setInterval(() => {
      fetch.get(`https://spiffy-lock.glitch.me/`).set('user-agent', 'official-pinger/1.0.0').then(x => x);
    }, 180000); 
    setInterval(() => {
      fetch.get(`https://spiffy-lock.glitch.me/`).set('user-agent', 'official-pinger/1.0.0').then(x => x);
    }, 240000);