var fs = require('fs');
var Twit = require('twit');
var _ = require('underscore');
var util = require('util');
var creds = require('../data/creds.js');

var T = new Twit(creds);
var followerIds = [];

function getFollowers(cursor) {
	if (cursor === 0) {
		var wstream = fs.createWriteStream('./test.txt');
		wstream.write(followerIds);
	} else {
		T.get('followers/ids', {
			user_id: 12912,
			cursor: cursor
		}, function(err, data) {
			if (err) return console.log(util.inspect(err));
			followerIds = followerIds.concat(data.ids);
			getFollowers(data.next_cursor);
		});
	}
}

getFollowers(-1);