var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var server = express();
var fs = require('fs');

//cloud: '/home/myApp/cloud/main.js', // Absolute path to your Cloud Code
//fileKey: 'optionalFileKey',

// get our apps config
var apps = JSON.parse(fs.readFileSync('apps.json', 'utf8'));
// create our obeject that constains all the instances for api
const instancesAPI = {};
// loop ours apps
apps.apps.forEach(function(app){
	const optionsKeys = Object.keys(app);
	const options = {};

	optionsKeys.forEach(function(attr){
		const attrValue = attr === 'cloud' ? __dirname + app[attr] : app[attr];
		options[attr] = attrValue;
	});

	instancesAPI[app.appId] = new ParseServer(options);
	// set our api to be used
	server.use(options.endPointAPI, instancesAPI[app.appId]);
});

const port = 1337;
console.log(__dirname);

server.listen(port, function() {
  console.log('parse-server-example running on port ' + port + '.');
});