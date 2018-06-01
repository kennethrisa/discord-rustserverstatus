# Rust discord bot that displayes online players
[![Docker Automated build](https://img.shields.io/docker/automated/kenrisa/discord-rustserverstatus.svg)](https://hub.docker.com/r/kenrisa/discord-rustserverstatus/)
[![Docker Pulls](https://img.shields.io/docker/pulls/kenrisa/discord-rustserverstatus.svg)](https://hub.docker.com/r/kenrisa/discord-rustserverstatus/)
![Discord-bot](https://i.gyazo.com/23a3f95b758a146efa7d4a3dfd5f3999.png)

Updates activity status on discord bot and displays how many players are connect to your rust server from rest api

Written in nodejs and requires npm and nodejs.

You can run it on windows, macOS, linux or docker, se the installation for more info.

* Support rust-server.info
* Support rust-server.net
* Bot update status every 6 minutes

# Configuration
config.json
```
{ 
  "debug" : false,
  "token"  : "<your token here>",
  "apiSite" : 1,
  "apiUrl" : "https://<full uri here>"
}
```
* token = Your bot token from discord.
* apiSite: To use rust-server.info, set apiSite = 1, rust-server.net, set apiSite = 2 in config.json
* apiUrl: Use full url, for rust-server.info: example: https://api.rust-servers.info/status/106 and rust-server.net: https://rust-servers.net/api/?object=servers&element=detail&key={ServerKey}

# Installation:
* Requires node ^8.0, runs on windows, macOS, linux and docker.
* For installation of nodejs, see here for instruction: https://nodejs.org/en/download/ or https://nodejs.org/en/download/package-manager/
* Edit config.json and update the file with data.
* npm install.
* node app (In windows you have to open powershell).

###### Windows only: Install the app as a windows service.
  - Open powershell: npm install
  - npm install -g node-windows
  - node installSVC.js
  - You will get some prompt to allow it to install, press yes on all.
  - Open services.msc and see discord-rustserverstatus is started. now it will always start on bootup.

* Uninstall:
  - node uninstallSVC.js
  - Press yes on all prompts

# Create your discord-bot and invite it to your server:
* https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token
* The token you have to configure in config.json.
* Invite your bot to your discord server: https://discordapp.com/oauth2/authorize?&client_id=YOUR_CLIENT_ID_HERE&scope=bot&permissions=0

# Docker
```
docker run --name discord-rustserverstatus --restart=unless-stopped \
   -e token=<your token here> \
   -e apiSite=1 \
   -e apiUrl=https://<full uri here> \
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

