var fs = require('fs');
var Twit = require('twit');
var _ = require('underscore');
var util = require('util');
var async = require('async');

var creds = require('../data/creds.js');

var T = new Twit(creds);

var app = {};

app = (function() {
	var cursor = -1;
	var _getFollowers = function(id) {
		if (cursor === 0) {
			// var wstream = fs.createWriteStream('./test.txt', {
			// 	'flags': 'a'
			// });
			// wstream.write(JSON.stringify(dataset));
			console.log(JSON.stringify(dataset));
			// return JSON.stringify(dataset);
		} else {
			console.log(cursor);
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
								_getFollowers(id);
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
				console.log(cursor);
				_getFollowers(id);
			});
		}
	};

	return {
		getFollowers: _getFollowers
	};

})();

module.exports = app;