const Discord = require("discord.js")
const request = require('request')
const rcon = require("./rcon/app.js")
const SourceQuery = require('sourcequery')


const updateInterval = (1000 * 60) * 3 || (1000 * 60) * process.env.updateInterval || (1000 * 60) * config.updateInterval
const maxServers = 5;

for (var i = 1; i <= maxServers; i++){
    if (i > maxServers) {
      console.log("Max servers is over " + maxServers)
      console.log("Please verify max servers and try again")
      process.exit()
    }

    // Functions
    function updateActivity() {
        if (apiSite == 1) {
            require("tls").DEFAULT_ECDH_CURVE = "auto"
            request({ url: apiUrl, headers: { json: true, Referer: 'discord-rustserverstatus' }, timeout: 10000 }, function (err, res, body) {
                if (!err && res.statusCode == 200) {
                    const server = JSON.parse(body)
                    const is_online = server.status
                    if (is_online == "Online") {
                        const players = server.players
                        const maxplayers = server.players_max
                        if (debug) console.log("Updated rust-servers.info")
                        return client.user.setActivity(`${players}/${maxplayers}`)
                    } else {
                        return client.user.setActivity("Offline")
                    }
                }
            })
        }
        if (apiSite == 2) {
            request({ url: apiUrl, headers: { Referer: 'discord-rustserverstatus' }, timeout: 10000 }, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    const server = JSON.parse(body)
                    const is_online = server.is_online
                    if (is_online == 1) {
                        const players = server.players
                        const maxplayers = server.maxplayers
                        if (debug) console.log("Updated rust-servers.net")
                        return client.user.setActivity(`${players}/${maxplayers}`)
                    } else {
                        return client.user.setActivity("Offline")
                    }
                }
            })
        }
        if (apiSite == 3) {
            require("tls").DEFAULT_ECDH_CURVE = "auto"
            request({ url: apiUrl, headers: { json: true, Referer: 'discord-rustserverstatus' }, timeout: 10000 }, function (err, res, body) {
                if (!err && res.statusCode == 200) {
                    const jsonData = JSON.parse(body)
                    const server = jsonData.data.attributes
                    const is_online = server.status
                    if (is_online == "online") {
                        const players = server.players
                        const maxplayers = server.maxPlayers
                        const queue = server.details.rust_queued_players
                        let status = `${players}/${maxplayers}`
                        if (queue != "0") {
                            status += ` (${queue} ${queueMessage})`
                        }
                        if (debug) console.log("Updated from battlemetrics, serverid: " + server.id)
                        return client.user.setActivity(status)
                    } else {
                        return client.user.setActivity("Offline")
                    }
                }
            })
        }
        if (apiSite == 4) {
            if (!serverIp || !serverPort) {
                console.log("You have to configure serverIP/port")
                process.exit()
            } else {
                const sq = new SourceQuery(1000) // 1000ms timeout
                sq.open(serverIp, serverPort)

                sq.getInfo(function(err, info) {
                    if (err) { return client.user.setActivity("Offline") }
                    else {
                        if (debug) { console.log('Server Info: \nIP: %s\nPort: %s\nName: %s\nPlayers: %s/%s', serverIp, serverPort, info.name, info.players, info.maxplayers) }
                        const players = info.players
                        const maxplayers = info.maxplayers
                        const status = `${players}/${maxplayers} players`
                        return client.user.setActivity(status)
                    }
                })
            }
        }
    }
    // End Functions
    
    const config = require("./config/server"+i+".json");
    //const config = require("./config.json")

    const debug = process.env.debug || config.debug
    const apiUrl = process.env.apiUrl || config.apiUrl
    const apiSite = process.env.apiSite || config.apiSite
    const serverIp = process.env.serverIp || config.serverIp
    const serverPort = process.env.serverPort || config.serverPort
    const enableRcon = process.env.enableRcon || config.enableRcon
    const prefix = process.env.prefix || config.prefix
    const roles = process.env.roles || config.roles
    const queueMessage = process.env.queueMessage || config.queueMessage

    const client = new Discord.Client()
    

    client.on("ready", () => {
        console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`)
        updateActivity()
        setInterval(function () {
            updateActivity()
        }, updateInterval)
    })

    if (enableRcon == 1) {
        client.on("message", async message => {
    
            if(message.author.bot) return
            if(message.content.indexOf(prefix) !== 0) return
    
            var args = message.content.slice(prefix.length).trim().split(/ +/g)
            var command = args.shift().toLowerCase()
    
            if(command === "rcon") {
                // Checks for discord permission
                if(!message.member.roles.some(r=>roles.includes(r.name)) )
                    return message.reply("Sorry, you don't have permissions to use this!")
            
                var getMessage = args.join(" ")
            
                // Rcon message.
                argumentString = `${getMessage}`
            
                // Rcon Config
                rconhost = process.env.rconhost || config.rconhost
                rconport = process.env.rconport || config.rconport
                rconpass = process.env.rconpass || config.rconpass
        
                // Run rcon command.
                rcon.RconApp(argumentString, rconhost, rconport,rconpass, debug)
            
                // Send message back to discord that we are trying to relay the command.
                message.channel.send(`Trying to relay command: ${getMessage}`)
            }
        })
    }
    else if (debug) console.log("Rcon mode disabled")

    client.on("guildCreate", guild => {
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`)
    })
    
    client.on("guildDelete", guild => {
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`)
    })
    
    client.on('error', function (error) {
    if (debug) console.log(error)
    })
    
    client.login(process.env.token || config.token)
}