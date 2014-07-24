var express = require('express'),
	ejs = require('ejs'),
	bodyParser = require('body-parser'),
	request = require('request');

var favorites = []
var app = express()

app.use(bodyParser.urlencoded());


app.get('/', function(req,res){
	res.render('index.ejs');
});

app.get('/movie/:id', function(req,res){
	var id = req.params.id;
	var url = "http://www.omdbapi.com/?i=" + id;
	request(url, function(error, responce, body) {
		if (!error){
			var data = JSON.parse(body);
			res.render("movie.ejs", {movie: data });
		}
	});
});

app.get('/search', function(req,res){
	var query = req.query.searchTerm;
	var url = "http://www.omdbapi.com/?s=" + query;
	request(url, function(error, responce, body) {
		if (!error){
			var data = JSON.parse(body);
			res.render("results.ejs", {movieList: data.Search || []});
		}
	});
});
app.get('/favorites', function(req,res) {
	res.render('favorites.ejs', {favorites: favorites})
});

app.post('/movie', function(req,res){

	var title = req.body.Title;
	favorites.push(title);

	res.redirect('/favorites');
})

app.listen(3000);