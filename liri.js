var keys = require("./keys.js");
// console.log(keys.twitterKeys.consumer_key);

// var request = require("request");

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
	    // console.log(data);
	    console.log("Song name: " + data.tracks.items[0].name);
	    var artists = [];
	    for(i=0; i<data.tracks.items[0].album.artists.length; i++){
	    	artists.push(data.tracks.items[0].album.artists[i].name)
	    };
	    console.log("Artist(s): " + artists.join());
		console.log("Album: " + data.tracks.items[0].album.name);
		console.log("Preview: " + data.tracks.items[0].preview_url);
	});
};

var request = require("request");

var searchOmdb = function(title){

	// Then run a request to the OMDB API with the movie specified
	var queryUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&r=json";

	request(queryUrl, function(error, response, body) {

	  // If the request is successful
	  if (!error && response.statusCode === 200) {

	    // Parse the body of the site and recover just the imdbRating
	    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
	    body = JSON.parse(body);
	    console.log("Title: " + body.Title);
	    console.log("Release Year: " + body.Year);
	    console.log("IMDB Rating: " + body.imdbRating);
	    console.log("Country Produced: " + body.Country);
	    console.log("Language: " + body.Language);
	    console.log("Plot: " + body.Plot);
	    console.log("Actors: " + body.Actors);
	    for(i=0; i<body.Ratings.length; i++){
	    	if (body.Ratings[i].Source === "Rotten Tomatoes") {
	    		console.log("Rotten Tomatoes Rating: " + body.Ratings[i].Value);
	    	};
		}
	  }
	});
};

var fs = require("fs");

var readFile = function(){
	fs.readFile("random.txt", "utf8", function(error, data) {

	// We will then print the contents of data
	// console.log(data);

	// Then split it by commas (to make it more readable)
	var dataArr = data.split("\n");

	// Loop through each new line of data
	for(i=0; i<dataArr.length; i++){

		// split each lline into a temp array
		var runArr = dataArr[i].split(",");

		// send the new arguments to our run function
		start(runArr);
	};

	// We will then re-display the content as an array for later use.
	// console.log(dataArr);

	});
};

function start(args){

	if (args[0] === "my-tweets"){
		getTweets();
	} else if (args[0] === "spotify-this-song"){
		if (!args[1]) {
			searchSpotify("The Sign");
		}
		searchSpotify(args[1]);
	} else if (args[0] === "movie-this"){
		if (!args[1]) {
			searchOmdb("Mr. Nobody");
		}
		searchOmdb(args[1]);
	} else if (args[0] === "do-what-it-says"){
		readFile();
	}
	else console.log("I don't understand " + args[0]);
}

start(args);