var fs = require('fs');
var Twit = require('twit');
var _ = require('underscore');
var creds = require('../data/creds.js');

var T = new Twit(creds);

T.get('followers/ids', {
	user_id: 922
}, function(err, data) {
	var buffer = new Buffer(JSON.stringify(data), 'utf-8');
	var stream = fs.createWriteStream('./test.txt');
	stream.write(buffer);
});