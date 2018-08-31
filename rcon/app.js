#!/usr/bin/env node

exports.RconApp = function(){

	const config = require("../config.json");

	var args = process.argv.splice(process.execArgv.length + 2);
	for (var i = 0; i < args.length; i++)
	{
		if (i == args.length - 1) argumentString += args[i];
		else argumentString += args[i] + " "
	}

	if (argumentString.length < 1)
	{
		console.log("Error: Please specify an RCON command");
	}
	
	const debug = process.env.debug || config.debug;
	
	var serverHostname = rconhost;
	var serverPort = rconport;
	var serverPassword = rconpass;

	var messageSent = false;
	var WebSocket = require('ws');
	var ws = new WebSocket("ws://" + serverHostname + ":" + serverPort + "/" + serverPassword);
	
	ws.on('open', function open()
	{
		setTimeout(function()
		{
			messageSent = true;
			ws.send(createPacket(argumentString));
			setTimeout(function()
			{
				ws.close(1000);
				setTimeout(function()
				{
					if (debug) console.log("RconApp Command relayed");
					return;
				});
			}, 1000);
		}, 250);
	});
	ws.on('message', function(data, flags)
	{
		if (!messageSent) return;
		try
		{
			var json = JSON.parse(data);
			if (json !== undefined)
			{
				if (json.Message !== undefined && json.Message.length > 0)
				{
					if(debug) console.log(json.Message);
				}
			}
			else console.log("Error: Invalid JSON received");
		}
		catch(e)
		{
			if (e) console.log(e);
		}
	});
	ws.on('error', function(e)
	{
		return console.log(e);
	});
	function createPacket(command)
	{
		var packet =
		{
			Identifier: -1,
			Message: command,
			Name: "WebRcon"
		};
		return JSON.stringify(packet);
	}
}