var fs = require('fs');
var Twit = require('twit');
var _ = require('underscore');
var util = require('util');
var async = require('async');
var log4js = require('log4js');

var creds = require('../data/creds.js');

var logger = log4js.getLogger();
var T = new Twit(creds);

// function getFollowers(id, callback) {
// 	if (cursor === 0) {
// 		callback(null, dataset);
// 	} else {
// 		T.get('followers/ids', {
// 			// user_id: id,
// 			screen_name: id,
// 			cursor: cursor
// 		}, function(err, data) {900000
// 			if (err) {
// 				switch (err.statusCode) {
// 					case 429:
// 						console.log(util.format('Limit reached @ %s, process will resume in 15 min...', cursor));
// 						return setTimeout(function() {
// 							getFollowers(id, callback);
// 						}, );
// 					default:
// 						return console.log(util.inspect(err));
// 				}
// 			}
// 			dataset = {
// 				user: '',
// 				followers: []
// 			};
// 			dataset.user = id;
// 			dataset.followers = _.union(dataset.followers, data.ids);
// 			cursor = data.next_cursor;
// 			getFollowers(id, callback);
// 		});
// 	}
// }



function _fetchFollowers(nextCursor, id, cb) {
	T.get('friends/ids', {
		user_id: id,
		// screen_name: id,
		cursor: nextCursor
	}, function(err, result) {
		if (err) {
			switch (err.statusCode) {
				case 429:
					logger.debug('Rate limit exceeded (cursor: %s)', nextCursor);
					return setTimeout(function() {
						_fetchFollowers(nextCursor, id, cb);
					}, 900000);
				default:
					return cb(err);
			}
		}

		logger.debug('Fetched %d follower IDs (cursor: %s)',
			result.ids ? result.ids.length : '?',
			nextCursor);

		dataset = {
			user: '',
			friends: []
		};

		function mergeIds(ids) {
			if (_.isArray(ids)) {
				dataset.user = id;
				dataset.friends = _.union(dataset.friends, ids);
			}
		}

		mergeIds(result.ids);

		if (result['next_cursor'] !== 0) {
			// Fetch next cursor.
			_fetchFollowers(result['next_cursor'], function(err, ids) {
				if (err) {
					return cb(err);
				}
				mergeIds(ids);
				cb(null, dataset);
			});
		} else {
			// Return result.
			cb(null, dataset);
		}
	});
}

function write(data) {
	// var rstream = fs.createReadStream('../data/sample.csv');
	var wstream = fs.createWriteStream('./test.txt', {
		'flags': 'a'
	});
	wstream.write(JSON.stringify(data));
}

var rstream = fs.createReadStream('../data/sample.csv');
rstream.setEncoding('utf8');
var result = [];

rstream.on('data', function(data) {
	results = data.split('\r\n');
	results = _.filter(results, function(val) {
		if (!isNaN(val)) {
			return parseInt(val);
		}
	});
	// results = ['heynickc', 'EmilyMMcKenzie', 'glowe'];
	_.each(results, function(item) {
		_fetchFollowers(-1, item, function(err, data) {
			write(data);
		});
	});
});