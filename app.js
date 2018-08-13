const Discord = require("discord.js");
const request = require('request');
const config = require("./config.json");

const debug = process.env.debug || config.debug;
const apiUrl = process.env.apiUrl || config.apiUrl; 
const apiSite = process.env.apiSite || config.apiSite; 

var updateInterval = (1000 * 60) * 6;

const client = new Discord.Client();

function updateActivity() {
  if(apiSite == 1) {
    require("tls").DEFAULT_ECDH_CURVE = "auto"
    request({ url: apiUrl, headers: { json: true, Referer: 'discord-rustserverstatus' }, timeout: 10000 }, function(err, res, body)
    {
      if (!err && res.statusCode == 200)
      {
        const server = JSON.parse(body);
        const is_online = server.status;
        if(is_online == "Online") {
          const players = server.players;
          const maxplayers = server.players_max;
          if(debug) console.log("Updated rust-servers.info");
          return client.user.setActivity(`${players}/${maxplayers}`);
        } else {
          return client.user.setActivity("Offline");
        }
      }
    });
  }
  if(apiSite == 2) {
    request({ url: apiUrl, headers: { Referer: 'discord-rustserverstatus' }, timeout: 10000 }, function(error, response, body)
    {
      if (!error && response.statusCode == 200)
      {
        const server = JSON.parse(body);
        const is_online = server.is_online;
        if(is_online == 1) {
          const players = server.players;
          const maxplayers = server.maxplayers;
          if(debug) console.log("Updated rust-servers.net");
          return client.user.setActivity(`${players}/${maxplayers}`);
        } else {
          return client.user.setActivity("Offline");
        }
      }
    });
  }
}

client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  updateActivity();
  setInterval(function () {
    updateActivity();
  }, updateInterval);
});

client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

client.login(process.env.token || config.token);
