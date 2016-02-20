// Main
//Load modules
var express    = require('express');        // call express
var config = require('./config');
var bodyParser = require('body-parser');
var jwt = require('express-jwt');
var cors = require('cors');
var massive = require("massive");

var db = massive.connectSync({connectionString : config.db});
var app        = express();                 // define our app using express
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var jwtCheck = jwt({
  secret: new Buffer('4icOObTPDXYBH3hJAsScIXN_Ay44jjoxYKiuQLQErtHLPZXX2h40c9o-VTT4HCMH', 'base64'),
  audience: 'IJqdCQThmwg3Z7xOAqw3ve7pAFDbPp36'
});

// ROUTES FOR OUR API
// Middleware
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'Hooray! welcome to our api!' });   
});

var api = require('./routes/api');

var injectdb = function(req, res, next){//Make our db accessible to our router
	req.db = db;
	next();
};
// REGISTER OUR ROUTES -------------------------------

app.use(cors()); //Cross Origin Request
// all of our routes will be prefixed with /api
// Check token, add db service, send to api route
//app.use('/api', jwtCheck, injectdb, api); // Production
app.use('/api', injectdb, api); // Dev-only
app.use('/', router); //Default page
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
		.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
	  .json({
    message: err.message,
    error: {}
  });
});

//Exit handlers
function killMe() {
	server.close();
	console.log('Shutting api server down...');
	process.exit();
};
process.on('SIGINT', killMe); //Ctrl + C
process.on('exit', function () {
	console.log('Exiting...');
});
// START THE SERVER
// =============================================================================
var server;
var port = process.env.PORT || 3001;        // set our port

server = app.listen(port);
console.log('Api server starting on port ' + port);
