Parse.Cloud.define('getUserByName', function(req, res){
	var query = new Parse.Query('loquesea');
	var param = req.params.name;
	query.equalTo('nombre', param);

	query.find({
		success: function(result) {
			res.success(result);
		},
		error: function() {
			res.error('there is not such a name called' + param);
		}
	});
});

// the way to call this function in REST API is simple
// supose that you`re using http://localhost:1337/parse
// just use that url and append /functions/nameOfFunctionDefined.
// sample : http://localhost:1337/parse/functions/getUserByName
// once you call this function you must pass though headers like
// X-Parse-Application-Id : YOUR_APP_ID
// X-Parse-Master-Key : YOUR_MASTER_KEY || YOUR_CLIENT_KEY... etc.
// Content-Type : application/json
// and pass through body the params in json format like
// {nombre : 'YOUR NAME'}