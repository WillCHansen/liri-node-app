var keys = require("./keys.js");
// console.log(keys.twitterKeys.consumer_key);

var request = require("request");

var args = process.argv.splice(2);

var twitter = require("twitter");
var getTweets = function(){
	// create a new twitter client using the twitter constructor
	var client = new twitter({
		consumer_key: keys.twitterKeys.consumer_key,
		consumer_secret: keys.twitterKeys.consumer_secret,
		access_token_key: keys.twitterKeys.access_token_key,
		access_token_secret: keys.twitterKeys.access_token_secret
	});

	// Searching twitter for 20 tweets from my user id
	client.get('search/tweets', {q: 'TheWillHansen', count: 20}, function(error, tweets, response) {
		// iterate over data.statuses and do stuff with the returned JSON
		console.log(tweets.statuses.length);
		for(i=0; i<tweets.statuses.length; i++){
			console.log(tweets.statuses[i].created_at);
	   		console.log(tweets.statuses[i].text);
		}
	});
};

var spotify = require('spotify');
 
 var searchSpotify = function(song){
	spotify.search({ type: 'track', query: song }, function(err, data) {
	    if ( err ) {
	        console.log('Spotify error occurred: ' + err);
	        return;
	    }
	    // Do something with 'data' 
	    console.log("Song name: " + data.tracks.items[0].name);
	    var artists = [];
	    for(i=0; i<data.tracks.items[0].album.artists.length; i++){
	    	artists.push(data.tracks.items[0].album.artists[i].name)
	    };
	    console.log("Artist(s): " + artists.join());
		console.log("Album: " + data.tracks.items[0].album.name);
		console.log("Preview: " + data.tracks.items[0].preview_url);
	});
}


if (args[0] === "my-tweets"){
	getTweets();
} else if (args[0] === "spotify-this-song"){
	searchSpotify(args[1]);

} else if (args[0] === "movie-this"){

};