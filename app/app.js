var fs = require('fs');
var Twit = require('twit');
var _ = require('underscore');
var util = require('util');
var async = require('async');

var creds = require('../data/creds.js');

var T = new Twit(creds);
var app = {};
var cursor = -1;


function getFollowers(id, callback) {
	if (cursor === 0) {
		callback(dataset);
	} else {
		T.get('followers/ids', {
			// user_id: id,
			screen_name: id,
			cursor: cursor
		}, function(err, data) {
			if (err) {
				switch (err.statusCode) {
					case 429:
						console.log(util.format('Limit reached @ %s, process will resume in 15 min...', cursor));
						return setTimeout(function() {
							getFollowers(id, callback);
						}, 900000);
					default:
						return console.log(util.inspect(err));
				}
			}
			dataset = {
				user: '',
				followers: []
			};
			dataset.user = id;
			dataset.followers = _.union(dataset.followers, data.ids);
			cursor = data.next_cursor;
			getFollowers(id, callback);
		});
	}
}

var rstream = fs.createReadStream('../data/sample.csv');
rstream.setEncoding('utf8');
var result = [];

function write(data) {
	var rstream = fs.createReadStream('../data/sample.csv');
	var wstream = fs.createWriteStream('./test.txt', {
		'flags': 'a'
	});
	wstream.write(JSON.stringify(data));
}

rstream.on('data', function(data) {
	// result = data.split('\r\n');
	// result = _.filter(result, function(val) {
	// 	if (!isNaN(val)) {
	// 		return val;
	// 	}
	// });

	results = ['heynickc', 'EmilyMMcKenzie'];
	async.forEach(results, function(result, callback) {
			getFollowers(result, function(val) {
				write(val);
			});
		},
		function(err) {
			console.log(err);
		});
});