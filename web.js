var express    = require("express"),
  http = require('http'),
  url = require("url"),
    bodyParser = require('body-parser');
    // fs         = require('fs');
var app = express();
// app.use(express.logger());

app.use(express.static(__dirname + '/webroot'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
  response.sendfile(__dirname + '/webroot/index.html');
});

app.get('/2020', function (request, response) {
  var queryData = url.parse(request.url, true);
  console.log(queryData.query.city);
  app.set('_city', queryData.query.city)
  response.sendfile(__dirname + '/webroot/index.html');
  // response.render(__dirname + '/webroot/index.html', { city: queryData.query.city});
});

/***********
 * routing *
 ***********/
app.get('/testroute', function(req, res){
  res.download(__dirname + '/webroot/testroute.html');
});

var port = process.env.PORT || 5000;
  app.listen(port, function() {
  // console.log("Listening on " + port);
});
