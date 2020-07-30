# Discord bot that displayes online players

[![Docker Automated build](https://img.shields.io/docker/automated/kenrisa/discord-rustserverstatus.svg)](https://hub.docker.com/r/kenrisa/discord-rustserverstatus/)
[![Docker Pulls](https://img.shields.io/docker/pulls/kenrisa/discord-rustserverstatus.svg)](https://hub.docker.com/r/kenrisa/discord-rustserverstatus/)
[![Docker Build Status](https://img.shields.io/docker/build/kenrisa/discord-rustserverstatus.svg)](https://hub.docker.com/r/kenrisa/discord-rustserverstatus/)
[![Build Status](https://dev.azure.com/kenrisa/discord-rustserverstatus/_apis/build/status/Azure%20Pipelines?branchName=master)](https://dev.azure.com/kenrisa/discord-rustserverstatus/_build/latest?definitionId=5&branchName=master)

![Discord-bot](https://i.gyazo.com/23a3f95b758a146efa7d4a3dfd5f3999.png)

# Bot

Updates activity status on discord bot and displays how many players are connected to your game server that support sourcequery / rest api sites and webrcon.

This was first created for the game Rust, but it also now support any games that support sourcequery or from rest api from the sites below.

Written in nodejs and requires npm and nodejs.

You can run it on windows, macOS, linux or docker, se the installation for more info.

* Sourcequery
* Supported api sites:
* rust-servers.info
* rust-servers.net
* battlemetrics.com (All games)
* Bot update status every 1-3 minutes

# Changelog

[Changelog](/changelog.md)

# Configuration
example_config.json

Location: config/serverX.json (default on first startup: config/server1.json)
```
{
  "debug" : false,
  "token"  : "your token here",
  "apiSite" : 4,
  "apiUrl" : "https://full uri here",
  "serverIp": "",
  "serverPort": "28015",
  "enableRcon" : "0",
  "rconhost"   : "",
  "rconport"   : "",
  "rconpass"   : "",
  "prefix" : "!",
  "roles"  :  ["Administrator", "admins"],
  "queueMessage"  :  "currently waiting in queue.",
  "statusType" : "",
  "updateInterval" : "1"
}
```
* token = Your bot token from discord.
* apiSite: To use sourcequery: apiSite = 4 and configure serverIP and serverPort
* apiSite: To use rust-servers.info: apiSite = 1
* apiSite: To use rust-servers.net: apiSite = 2
* apiSite: To use battlemetrics.com: apiSite = 3
* apiUrl: Use full url, for rust-servers.info: example: https://api.rust-servers.info/status/106 or
* rust-servers.net: https://rust-servers.net/api/?object=servers&element=detail&key=ServerKey or
* https://api.battlemetrics.com/servers/2559877 (add your serverid)
* Client secret is used to invite the bot to your server. Token is used for the bot to connect to discord.
* enableRcon must be 1 if you want to use rcon to send commands to your server.
* queueMessage message to display after queue number. Only available using battlemetrics.

# Installation:
* Requires node ^12.0, runs on windows, macOS, linux and docker.
* For installation of nodejs, see here for instruction: https://nodejs.org/en/download/ or https://nodejs.org/en/download/package-manager/
* Edit config.json and update the file with Bot token (Not Client secret!).
1. Download it as zip or use git clone https://github.com/kennethrisa/discord-rustserverstatus.git
2. Extract it and open folder, than open powershell in the same folder.
3. Run command: npm install (This downloads the require modules from package.json)
  1.  a: You can manualy do this with command: npm install discord.js request ws sourcequery
  2.  b: You should now see that you have a new folder node_modules.
  3.  c: Start the bot npm start, and then close it, you will then see it has created a config file under /config/server1.json
4. Open config/server1.json and add your token from (Do not use client secret) https://discordapp.com/developers/applications/me/
![Discord-bot-token](https://i.gyazo.com/7a19e5d13171f192e0ea6de3a607777a.png)
5. Now we can start the bot with command: node app.js and you should see that the bot is started.

### Install Windows only from command prompt (Manuall start)
  - Open powershell in the directory you downloaded: npm install
  - npm start # (It will fail bc of config file does not exist and create an example one)
  - It will now create a config file in folder config/server1.json
  - Edit server1.json with all the information.
  - Start the bot again: npm start

### Windows only: Install the app as a windows service.
  - Open powershell: npm install
  - npm install -g node-windows
  - npm link node-windows
  - node installSVC.js
  - You will get some prompt to allow it to install, press yes on all.
  - Open services.msc and see discord-rustserverstatus is started. now it will always start on bootup.

* Uninstall:
  - node uninstallSVC.js
  - Press yes on all prompts

### Linux only: Start bot always using forever
  - $ npm install forever -g
  - $ forever start /path/to/app.js
  - Someone named nimdasys on oxide reported it. Thanks

# Create your discord-bot and invite it to your server:
* https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token
* The token you have to configure in config.json.
* Invite your bot to your discord server: https://discordapp.com/oauth2/authorize?&client_id=YOUR_CLIENT_ID_HERE&scope=bot&permissions=0

# Docker
```
Using sourcequery:
docker run --name discord-rustserverstatus --restart=unless-stopped \
   -e token="your token here" \
   -e apiSite=4 \
   -e serverIp=1.1.1.1 \
   -e serverPort=28015 \
   -e roles="Owner" \
   kenrisa/discord-rustserverstatus:latest

docker run --name discord-rustserverstatus --restart=unless-stopped \
   -e token=your_token_here \
   -e apiSite=1 \
   -e apiUrl="https://full uri here" \
   -e enableRcon=1 \
   -e rconhost=yourip \
   -e rconport=28016 \
   -e rconpass="yourpassword" \
   -e prefix="!" \
   -e roles="Owner" \
   -e queueMessage="currently waiting in queue" \
   -e statusType=""
   -e updateInterval="3" \
   kenrisa/discord-rustserverstatus:latest
```
* Using docker-compose
```
git clone https://github.com/kennethrisa/discord-rustserverstatus.git
docker-compose pull
docker-compose up -d

Using with volumes and support for multiple bots:
Remove environment, and only have volumes:
---
version: '2'
services:
  bot:
    build: .
    image: kenrisa/discord-rustserverstatus
    container_name: discord-rustserverstatus
    restart: unless-stopped
    volumes:
      - ./config:/usr/src/app/config

```
* You can also build the image your self using the docker-compose
```
git clone https://github.com/kennethrisa/discord-rustserverstatus.git
docker-compose build
docker-compose up -d
```

