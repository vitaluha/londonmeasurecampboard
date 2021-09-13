var express = require("express"),
  http = require('http'),
  url = require("url"),
  path = require("path"),
  bodyParser = require('body-parser');
var app = express();

// app.use(express.static(__dirname + '/webroot'));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());



app.get('/2020', function (request, response) {
  app.use(express.static(__dirname + '/webroot'));
  var queryData = url.parse(request.url, true);
  app.set('_city', queryData.query.city);
  app.set('_year', 2020);
  response.sendFile(__dirname + '/webroot/index.html');
});

app.get('/2021', function (request, response) {
  app.use(express.static(__dirname + '/webroot'));
  var queryData = url.parse(request.url, true);
  app.set('_city', queryData.query.city);
  app.set('_year', 2021);
  response.sendFile(__dirname + '/webroot/index.html');
});

app.get('/', function (request, response) {
  app.set('_city', 'Home');
  app.use(express.static(__dirname + '/webroot/board'))
  const file = __dirname + '/webroot/board/index.html';

  response.sendFile(file);
});

/***********
 * routing *
 ***********/
app.get('/testroute', function (req, res) {
  res.download(__dirname + '/webroot/testroute.html');
});

var port = process.env.PORT || 5000;
app.listen(port, function () {

});
