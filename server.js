var Environment = require('./config').ENVIRONMENT;
var express	= require('express');
var bodyParser = require('body-parser');
var app	= express();

app.use(bodyParser());

var port = process.env.PORT || 8080; // set our port

var mongoose = require('mongoose');
mongoose.connect(Environment.mongo.connectString); // connect to our database

var eventHandler = require('./models/event');
var userHandler = require('./models/user');

// ROUTES FOR OUR API
// =============================================================================
// create our router
var router = express.Router();

router.use(function(req, res, next) {
	next();
***REMOVED***);

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'uomsa events api' ***REMOVED***);	
***REMOVED***);

// on routes that end in /events
// ----------------------------------------------------
router.route('/events')
	.post(eventHandler.createEvent)// create a event (accessed at POST http://localhost:8080/api/events)
	.get(eventHandler.readAllEvents)// get all the events (accessed at GET http://localhost:8080/api/events)

// on routes that end in /events/:event_id
// ----------------------------------------------------
router.route('/events/:event_id')
	.get(eventHandler.readEvent)// get the event with that id
	.put(eventHandler.updateEvent)// update the event with this id
	.delete(eventHandler.deleteEvent);// delete the event with this id
	
//
// on routes that end in /users
// ----------------------------------------------------
router.route('/users')
	.post(userHandler.createUser);// create a user (accessed at POST http://localhost:8080/api/user)

// on routes that end in /events/:event_id
// ----------------------------------------------------
router.route('/users/:user_id')
	.get(userHandler.readUser)// get the event with that id
	.put(userHandler.updateUser)// update the event with this id
	.delete(userHandler.deleteUser);	// delete the event with this id


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('uoMSA RESTAPI running on port ' + port);
