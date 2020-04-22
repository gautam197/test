var express = require('express');
var app = express();

// }
// app.use(middleware.requireAuthentication);
app.get('/about', middleware.requireAuthentication, function (req, res) {
	res.send("<h1> hello youtube </h1>");
});
app.use(express.static(__dirname + '/public'));
app.listen(3000);	