# Release log
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