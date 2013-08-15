<?php

require_once('TwitterAPIExchange.php');

$settings = array(
	'oauth_access_token' => "130244330-976qappXeD8UMErO4caDHfdkUDU1tOVUNL2JYx4U",
	'oauth_access_token_secret' => "270qdjfwMbJAg4jBiogjcUNv0DmUzmdhcgjzRwdD2M",
	'consumer_key' => "aflKbIDyiixpG4cNVZNpQ",
	'consumer_secret' => "o5K47PEQPZS1wffwNWT64JhsnP3XjRbhANwXqzAIzI"
);

$url = 'https://api.twitter.com/1.1/followers/ids.json';
$getfield = '?screen_name=EmilyMMcKenzie';
$requestMethod = 'GET';

$twitter = new TwitterAPIExchange($settings);
$response = $twitter->setGetfield($getfield)
	    			 ->buildOauth($url, $requestMethod)
            		 ->performRequest();

var_dump(json_decode($response));	