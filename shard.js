const { ShardingManager } = require('discord.js');

const shards = new ShardingManager('./app.js', {
    token: process.env.TOKEN,
    totalShards: 1
});

shards.on('launch', shard => {
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] 💎 Launched shard #${shard.id} 🎉`);

});

shards.on('message', (shard, msg) => {
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] #${shard.id} | ${msg._eval} | ${msg._result}`);

});

shards.spawn(this.totalShard, 50000);

process.on('unhandledRejection', e => console.error(e))
.on('uncaughtException', e => console.error(e));