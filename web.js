var express    = require("express"),
    http       = require('http'),
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
