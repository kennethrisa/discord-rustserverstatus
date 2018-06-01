// for windows
// Install as a service
// https://stackoverflow.com/questions/20445599/auto-start-node-js-server-on-boot?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa

var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'discord-rustserverstatus',
  description: 'Updates activity status on discord bot and displays how many players are connect to your rust server from rest api',
  script: require('path').join(__dirname,'app.js')
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();