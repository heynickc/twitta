var Twit = require('twit');
var creds = require('../data/creds.js');

var T = new Twit(creds);

T.get('followers/list', {
	screen_name: 'heynickc'
}, function(err, data) {
	console.log(data);
});