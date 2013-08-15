var Twit = require('twit');

var T = new Twit({
	consumer_key: '',
	consumer_secret: '',
	access_token: '',
	access_token_secret: ''
});

T.get('followers/list', {
	screen_name: 'heynickc'
}, function(err, data) {
	console.log(data);
});