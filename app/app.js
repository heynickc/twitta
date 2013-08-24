var fs = require('fs');
var Twit = require('twit');
var _ = require('underscore');
var util = require('util');
var creds = require('../data/creds.js');

var T = new Twit(creds);
var cursor = -1;

function Set() {
	this.user = '';
	this.followers = [];
}

function getFollowers(id, cursor) {
	if (cursor === 0) {
		// var wstream = fs.createWriteStream('./test.txt', {
		// 	'flags': 'a'
		// });
		// wstream.write(followerIds);
		console.log(JSON.stringify(dataset));
	} else {
		T.get('followers/ids', {
			user_id: id,
			cursor: cursor
		}, function(err, data) {
			if (err) {
				switch (err.statusCode) {
					case 429:
						console.log(util.format('Limit reached @ %s, process will resume in 15 min...', cursor));
						return setTimeout(function() {
							getFollowers(cursor);
						}, 900000);
					default:
						return console.log(util.inspect(err));
				}
			}
			dataset = new Set();
			dataset.user = id;
			dataset.followers = _.union(dataset.followers, data.ids);
			getFollowers(id, data.next_cursor);
		});
	}
}
// getFollowers(418, -1);

module.exports.getFollowers = getFollowers;