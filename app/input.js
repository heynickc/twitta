var fs = require('fs');
var _ = require('underscore');
var util = require('util');
var async = require('async');
var getFollowers = require('./app.js');

var rstream = fs.createReadStream('../data/sample.csv');
rstream.setEncoding('utf8');
var result = [];

rstream.on('data', function(data) {
	// result = data.split('\r\n');
	// result = _.filter(result, function(val) {
	// 	if (!isNaN(val)) {
	// 		return val;
	// 	}
	// });
	// app.getFollowers('heynickc');

	result = ['heynickc', 'EmilyMMcKenzie'];
	async.each(result, getFollowers, function(err, vals) {
		var wstream = fs.createWriteStream('./test.txt', {
			'flags': 'a'
		});
		wstream.write(JSON.stringify(vals));
	});
});