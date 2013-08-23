var fs = require('fs');
var Twit = require('twit');
var _ = require('underscore');
var util = require('util');
var creds = require('../data/creds.js');

var T = new Twit(creds);
var followerIds = [];

function getFollowers(cursor) {
	if (cursor === 0) {
		// var wstream = fs.createWriteStream('./test.txt', {
		// 	'flags': 'a'
		// });
		// wstream.write(followerIds);
		console.log(followerIds);
	} else {
		T.get('followers/ids', {
			user_id: 418,
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
			followerIds = followerIds.concat(data.ids);
			console.log(data.next_cursor);
			getFollowers(data.next_cursor);
		});
	}
}
getFollowers(-1);

// module.exports.getFollowers = getFollowers;
