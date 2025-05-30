import { Client, GatewayIntentBits } from 'discord.js';
import axios from 'axios';
import { GameDig } from 'gamedig';
import fs from 'fs';

const configdir = './config';
const maxServers = 10;

if (!fs.existsSync(configdir)){
    fs.mkdirSync(configdir);
}

fs.readdir(configdir, (err, files) => {
    try {
        if (files.length < 1 )
        var writeConfig = '{"debug":false,"token":"","apiSite":"","apiUrl":"","serverIp":"","serverPort":"","queueMessage":"currently waiting in queue.","updateInterval":"1"}'
        var jsonData = JSON.parse(writeConfig);
        
        fs.writeFile("config/server1.json", JSON.stringify(jsonData, null, 2), 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
            console.log("Config file created");
        });   
    } catch (error) {
        
    }
});

fs.readdir(configdir, (err, files) => {

    for (var i = 1; i <= files.length; i++){
        if (i > maxServers) {
        console.log("Max servers is over " + maxServers)
        console.log("Please verify max servers and try again")
        process.exit()
        }

        // Functions
        function updateActivity() {
            if (apiSite == 2) {
                axios.get(apiUrl, {
                    headers: { Referer: 'discord-rustserverstatus' },
                    timeout: 10000
                })
                .then(response => {
                    if (response.status === 200) {
                        const server = response.data;
                        const is_online = server.is_online;
                        if (is_online == 1) {
                            const players = server.players;
                            const maxplayers = server.maxplayers;
                            if (debug) console.log("Updated rust-servers.net");
                            let status = `${players}/${maxplayers}`;
                            return client.user.setActivity(status, { type: statusType });
                        } else {
                            return client.user.setActivity("Offline");
                        }
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error.message);
                });
            }

            if (apiSite == 3) {
                axios.get(apiUrl, {
                    headers: { json: true, Referer: 'discord-rustserverstatus' },
                    timeout: 10000
                })
                .then(response => {
                    if (response.status === 200) {
                        const jsonData = response.data;
                        const server = jsonData.data.attributes;
                        const is_online = server.status;
                        if (is_online == "online") {
                            const players = server.players;
                            const maxplayers = server.maxPlayers;
                            const queue = server.details.rust_queued_players;
                            let status = `${players}/${maxplayers}`;
                            if (typeof queue !== "undefined" && queue != "0") {
                                status += ` (${queue} ${queueMessage})`;
                            }
                            if (debug) console.log("Updated from battlemetrics, serverid: " + server.id);
                            return client.user.setActivity(status, { type: statusType });
                        } else {
                            return client.user.setActivity("Offline");
                        }
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error.message);
                });
            }

            if (apiSite == 4) {
                if (!serverIp || !serverPort) {
                    console.log("You have to configure serverIP/port");
                    process.exit();
                } else {
                    GameDig.query({
                        type: 'rust',
                        host: serverIp,
                        port: serverPort
                    })
                    .then((state) => {
                        if (debug) { console.log(state); }
                        const players = state.numplayers;
                        const maxplayers = state.maxplayers;
                        let status = `${players}/${maxplayers}`;
                        return client.user.setActivity(status, { type: statusType });
                    })
                    .catch((error) => {
                        console.log("Server is offline");
                        return client.user.setActivity("Offline");
                    });
                }
            }
        }
        // End Functions

        try {
            var data = fs.readFileSync("./config/server"+i+".json", "utf8");
            var config = JSON.parse(data);
        } catch (error) {

        }
        const client = new Client({
            intents: [
              GatewayIntentBits.Guilds,
              GatewayIntentBits.GuildMessages,
            ]
        });

        const updateInterval = (1000 * 60) * 3 || (1000 * 60) * process.env.updateInterval || (1000 * 60) * config.updateInterval
        const debug = process.env.debug || config.debug
        const apiUrl = process.env.apiUrl || config.apiUrl
        const apiSite = process.env.apiSite || config.apiSite
        const serverIp = process.env.serverIp || config.serverIp
        const serverPort = process.env.serverPort || config.serverPort
        const queueMessage = process.env.queueMessage || config.queueMessage
        const statusType = process.env.statusType || config.statusType

        client.on("ready", () => {
            console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`)
            updateActivity()
            setInterval(function () {
                updateActivity()
            }, updateInterval)
        })

        client.on("guildCreate", guild => {
        console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`)
        })
        
        client.on("guildDelete", guild => {
        console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`)
        })
        
        client.on('error', function (error) {
        if (debug) console.log(error)
        })

        process.on('unhandledRejection', error => {
            if (error.code == 'TOKEN_INVALID') 
                return console.log("Error: An invalid token was provided.\nYou have maybe added client secret instead of BOT token.\nPlease set BOT token")
            
            return console.error('Unhandled promise rejection:', error);
        });
        
        client.login(process.env.token || config.token)
    }
});    