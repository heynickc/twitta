var fs = require('fs');
var _ = require('underscore');
var util = require('util');
var app = require('./app.js');

var rstream = fs.createReadStream('../data/sample.csv');
rstream.setEncoding('utf8');
var result = [];

rstream.on('data', function(data) {
	// result = data.split('\r\n');
	// result = [418,922];
	app.getFollowers(418, -1);
	// for (var i in result) {
	// 	if (!isNaN(result[i])) {
	// 		app.getFollowers(i, -1);
	// 	}
	// }
});

rstream.on('end', function() {
	console.log('File read');
});