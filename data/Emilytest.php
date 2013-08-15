<?php

require_once('TwitterAPIExchange.php');

$settings = array(
	'oauth_access_token' => "",
	'oauth_access_token_secret' => "",
	'consumer_key' => "",
	'consumer_secret' => ""
);

$url = 'https://api.twitter.com/1.1/followers/ids.json';
$getfield = '?screen_name=EmilyMMcKenzie';
$requestMethod = 'GET';

$twitter = new TwitterAPIExchange($settings);
$response = $twitter->setGetfield($getfield)
	    			 ->buildOauth($url, $requestMethod)
            		 ->performRequest();

var_dump(json_decode($response));	