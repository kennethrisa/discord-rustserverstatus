const Discord = require("discord.js");
const request = require('request');
const config = require("./config.json");
const rcon = require("./rcon/app.js");

const debug = process.env.debug || config.debug;
const apiUrl = process.env.apiUrl || config.apiUrl; 
const apiSite = process.env.apiSite || config.apiSite;
const enableRcon = process.env.enableRcon || config.enableRcon;
const prefix = process.env.prefix || config.prefix;
const roles = process.env.roles || config.roles;


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

if (enableRcon == 1)
	{
    client.on("message", async message => {

      if(message.author.bot) return;
      if(message.content.indexOf(prefix) !== 0) return;
    
      var args = message.content.slice(prefix.length).trim().split(/ +/g);
      var command = args.shift().toLowerCase();
    
    if(command === "rcon") {
      // Checks for discord permission
      if(!message.member.roles.some(r=>roles.includes(r.name)) )
        return message.reply("Sorry, you don't have permissions to use this!");
    
      var getMessage = args.join(" ");
      
      // Rcon message.
      argumentString = `${getMessage}`;
      
      // Rcon Config
      rconhost = process.env.rconhost || config.rconhost;
      rconport = process.env.rconport || config.rconport;
      rconpass = process.env.rconpass || config.rconpass;
      
      // Run rcon command.
      rcon.RconApp(argumentString, rconhost, rconport,rconpass, debug);
      
      // Send message back to discord that we are trying to relay the command.
      message.channel.send(`Trying to relay command: ${getMessage}`);
      }
    });
  }
  else if (debug) console.log("Rcon mode disabled")

client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

client.on('error', function (error) {
  if (debug) console.log(error);
});

client.login(process.env.token || config.token);


