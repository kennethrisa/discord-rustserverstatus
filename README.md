# Discord bot that displayes online players

[![Docker Automated build](https://img.shields.io/docker/automated/kenrisa/discord-rustserverstatus.svg)](https://hub.docker.com/r/kenrisa/discord-rustserverstatus/)
[![Docker Pulls](https://img.shields.io/docker/pulls/kenrisa/discord-rustserverstatus.svg)](https://hub.docker.com/r/kenrisa/discord-rustserverstatus/)
[![Docker Build Status](https://img.shields.io/docker/build/kenrisa/discord-rustserverstatus.svg)](https://hub.docker.com/r/kenrisa/discord-rustserverstatus/)
[![Build Status](https://dev.azure.com/kenrisa/discord-rustserverstatus/_apis/build/status/Azure%20Pipelines?branchName=master)](https://dev.azure.com/kenrisa/discord-rustserverstatus/_build/latest?definitionId=5&branchName=master)

![Discord-bot](https://i.gyazo.com/23a3f95b758a146efa7d4a3dfd5f3999.png)

# Bot

Updates activity status on discord bot and displays how many players are connected to your game server that support gamedig / rest api sites and webrcon.

This was first created for the game Rust, but it also now support any games that support gamedig or from rest api from the sites below.

Written in nodejs and requires npm and nodejs version ^18.09.

You can run it on windows, macOS, linux or docker, se the installation for more info.

* gamedig (All games)
* Supported api sites:
* rust-servers.net
* battlemetrics.com (All games)
* Bot update status every 1 minutes (or configured x min in config)

# Changelog

[Changelog](/changelog.md)

# Configuration
example_config.json

Location: config/serverX.json (default on first startup: config/server1.json)
```
{
  "debug": false,
  "token": "",
  "apiSite": "4",
  "apiUrl" : "https://full uri here",
  "serverIp": "",
  "serverPort": "28016,
  "queueMessage": "currently waiting in queue.",
  "updateInterval": "1"
}
```
* token = Your bot token from discord.
* apiSite: To use gamedig: apiSite = 4 and configure serverIP and serverPort
* apiSite: To use rust-servers.net: apiSite = 2
* apiSite: To use battlemetrics.com: apiSite = 3
* apiUrl: Use full url, for rust-servers.info: example: https://api.rust-servers.info/status/106 or
* rust-servers.net: https://rust-servers.net/api/?object=servers&element=detail&key=ServerKey or
* https://api.battlemetrics.com/servers/2559877 (add your serverid)
* Client secret is used to invite the bot to your server. Token is used for the bot to connect to discord.
* enableRcon must be 1 if you want to use rcon to send commands to your server.
* queueMessage message to display after queue number. Only available using battlemetrics.

# Install - Check our wiki

[Wiki](https://github.com/kennethrisa/discord-rustserverstatus/wiki/Install)

# Create your discord-bot and invite it to your server:
* https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token
* The token you have to configure in config.json.
* Invite your bot to your discord server: https://discordapp.com/oauth2/authorize?&client_id=YOUR_CLIENT_ID_HERE&scope=bot&permissions=0
