var express = require('express');
var app = express();
var middleware = require('./middleware.js');
var port = process.env.PORT || 3000;
// }
// app.use(middleware.requireAuthentication);
app.get('/about', middleware.requireAuthentication, function (req, res) {
	res.send("<h1> hello youtube </h1>");
});
app.use(express.static(__dirname + '/public'));
app.listen(port, function(){
	console.log('Express server started in port ' + port + '!!!');
});	