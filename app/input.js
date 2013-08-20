var fs = require('fs');
var _ = require('underscore');
var util = require('util');

var rstream = fs.createReadStream('../data/sample.csv');
rstream.setEncoding('utf8');
var result = [];

rstream.on('data', function(data) {
	result = data.split('\r\n');
	for (var i in result) {
		if (!isNaN(result[i])) {
			console.log(result[i]);
		}
	}
});

rstream.on('end', function() {
	console.log('File read');
});