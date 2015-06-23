#!/usr/bin/env node

var Rsync = require('rsync');
var server = require('./server.json');

// Build the command
var deploy = new Rsync()
  .shell('ssh')
  .flags('avz')
  .source('.')
  .exclude(['node_modules', '.git', '.DS_Store', 'server.json'])
  .delete()
  .destination(server.host + ':' + server.path);

// Execute the command
deploy.execute(function(error, code, cmd) {
	if (!error) {
		console.log('Done!');
	} else {
		console.error(error);
	}
});