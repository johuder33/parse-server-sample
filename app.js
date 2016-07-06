var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var server = express();
var fs = require('fs');

try{
	fs.accessSync(".env", fs.R_OK | fs.W_OK);
	require('dotenv').config();

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

	server.listen(port, function() {
		console.log('parse-server-example running on port ' + port + '.');
	});
}catch(e){
  console.log('some error ocurrs', e);
}