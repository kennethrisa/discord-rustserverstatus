# Release log
v1.1.0
# Add statusType to support status Watching.

Add this to your config to change from "Playing" to "Watching"
"statusType" : "WATCHING"
If you have anything else or "empty" like this: it will have "Playing" as status. 
"statusType" : ""

v1.0.1
# Support all battlemetrics games that have no queue

Thanks to pridit for this PR.

Allow all games on battlemetrics, that does not have queue in api.

v1.0.0 09.05.2020:
## BREAKING CHANGES:
* Requires node >= 12
* New config setup (Config are now stored in config/serverX.json) where X = number of server 1-10
* Support up 10 discord bots
* Updated Docker file to node 12-slim

Upgrade from v0.2.0:

Download latest zip file from [here](https://github.com/kennethrisa/discord-rustserverstatus/releases)


Backup your config.json file.<br>
copy your config.json to a new folder config/server1.json<br>
Overwrite the existing files with the files from the download zip file.<br>
run npm start

Remember to have upgraded to the latest nodejs version 12!

start your application running: <br>
npm install<br>
npm start

To create multiple bot, you copy your config server1.json to server2.json<br>
Example tree of config:
```
discord-rustserverstatus
└───config
│   │   server1.json
│   │   server2.json
│   │   server3.json
│   │   server5.json
│   │   server6.json
│   │   server7.json
│   │   server8.json
│   │   server9.json
│   │   server10.json
```

If you are running docker, it will start as normal.<br>
if you want to use more than 1 bot on docker, you will need to provide volume to docker. <br>
Create the alle the config files you need, see example_config.json
```
  - ./config:/usr/src/app/config
``` 
---

v0.1.0 07.09.2019:

Thanks for pull request for BM Que.
If BM show that you have que, it will now also show it on bot.

v0.0.10 12.01.2018:

Updated readme and upped version to 0.0.10

v0.0.9 12.01.2018:

Removed some debug message

v0.0.8 12.01.2018:

Added battlemetrics api support, requested by cwizard

v0.0.7 10.4.2018:

Changelog upped to 0.0.7

v0.0.6 10.4.2018:

handle on error events.


v0.0.5 31.08.2018: 

Added rcon support. 
New config.json 
npm install ws ( if you are upgradeing, or you can do: npm install - with new package.json)
You can configure permission on what channel the bot should have access to on discord with roles.
See config.json and add the right roles so you have access to (prefix)!rcon command. default is Administrator or admins
If you want to disable rcon mode set enableRcon to 0 in config.json
example rcon command: !rcon say Hello world (and it will relay the command to server)