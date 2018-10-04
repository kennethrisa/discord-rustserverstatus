# Rust discord bot that displayes online players

[![Docker Automated build](https://img.shields.io/docker/automated/kenrisa/discord-rustserverstatus.svg)](https://hub.docker.com/r/kenrisa/discord-rustserverstatus/)
[![Docker Pulls](https://img.shields.io/docker/pulls/kenrisa/discord-rustserverstatus.svg)](https://hub.docker.com/r/kenrisa/discord-rustserverstatus/)
[![Docker Build Status](https://img.shields.io/docker/build/kenrisa/discord-rustserverstatus.svg)](https://hub.docker.com/r/kenrisa/discord-rustserverstatus/)


![Discord-bot](https://i.gyazo.com/23a3f95b758a146efa7d4a3dfd5f3999.png)

# Bot

Updates activity status on discord bot and displays how many players are connect to your rust server from rest api

Written in nodejs and requires npm and nodejs.

You can run it on windows, macOS, linux or docker, se the installation for more info.

* Support rust-servers.info
* Support rust-servers.net
* Bot update status every 6 minutes

# Configuration
config.json
```
{ 
  "debug" : false,
  "token"  : "your token here",
  "apiSite" : 1,
  "apiUrl" : "https://full uri here",
  "enableRcon" : "0",
  "rconhost"   : "",
  "rconport"   : "",
  "rconpass"   : "",
  "prefix" : "!",
  "roles"  :  ["Administrator", "admins"]
}
```
* token = Your bot token from discord.
* apiSite: To use rust-servers.info: apiSite = 1
* apiSite: To use rust-servers.net: apiSite = 2
* apiUrl: Use full url, for rust-servers.info: example: https://api.rust-servers.info/status/106 or
* rust-servers.net: https://rust-servers.net/api/?object=servers&element=detail&key={ServerKey}
* Client secret is used to invite the bot to your server. Token is used for the bot to connect to discord.
* enableRcon must be 1 if you want to use rcon to send commands to your server.

# Installation:
* Requires node ^8.0, runs on windows, macOS, linux and docker.
* For installation of nodejs, see here for instruction: https://nodejs.org/en/download/ or https://nodejs.org/en/download/package-manager/
* Edit config.json and update the file with Bot token (Not Client secret!).
1. Download it as zip or use git clone https://github.com/kennethrisa/discord-rustserverstatus.git
2. Extract it and open folder, than open powershell in the same folder.
3. Run command: npm install (This downloads the require modules from package.json)
  3.  a: You can manualy do this with command: npm install discord.js request
  3.  b: You should now see that you have a new folder node_modules.
4. Open config.json and add your token from (Do not use client secret) https://discordapp.com/developers/applications/me/ 
![Discord-bot-token](https://i.gyazo.com/7a19e5d13171f192e0ea6de3a607777a.png)
5. Now we can start the bot with command: node app.js and you should see that the bot is started, wait 6 min, and the status should be updated.


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
docker run --name discord-rustserverstatus --restart=unless-stopped \
   -e token="your token here" \
   -e apiSite=1 \
   -e apiUrl="https://full uri here" \
   -e enableRcon=1 \
   -e rconhost=yourip \
   -e rconport=28016 \
   -e rconpass="yourpassword" \
   -e prefix="!" \
   -e roles="Administrator" \
   kenrisa/discord-rustserverstatus:latest
```
* Using docker-compose
```
git clone https://github.com/kennethrisa/discord-rustserverstatus.git
docker-compose pull
docker-compose up -d
```
* You can also build the image your self using the docker-compose
```
git clone https://github.com/kennethrisa/discord-rustserverstatus.git
docker-compose build
docker-compose up -d
```

# Credits
[Github](https://github.com/Didstopia) Didstopia

