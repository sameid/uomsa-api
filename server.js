var Environment = require('./config').ENVIRONMENT;

var express	= require('express');

//Express Middleware
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var cors = require('cors');

//Express
var app	= express();

//Passport Session Libs
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var RedisStore = require('connect-redis')(session);

//Middleware Instantiation
app.use(multer({uploadDir:'./uploads'***REMOVED***));
app.use(bodyParser());
app.use(cookieParser());
app.use(morgan('tiny'));
app.use(cors());
app.use(session({
    store: new RedisStore({
        host: Environment.redis.host, 
        port: Environment.redis.port
    ***REMOVED***),
    secret: 'd4t4b4s3',
    cookie: {
    	httpOnly: false
    ***REMOVED***
***REMOVED***));
app.use(passport.initialize());
app.use(passport.session());


var port = process.env.PORT || 8080; // set our port

//DB Specific Handling
var mongoose = require('mongoose');
var eventHandler = require('./models/event');
var userHandler = require('./models/user');

var connection = mongoose.connect(Environment.mongo.connectString, function(err){
	if (err) console.log(err);
***REMOVED***); // connect to our database


//Passport Specific stuff
passport.use(new LocalStrategy(userHandler.authenticate));
passport.serializeUser(userHandler.serialize);
passport.deserializeUser(userHandler.deserialize);

var auth = function (req, res, next) {
  if (req.isAuthenticated()) { next(); ***REMOVED***
  else {
  	res.send("Your request was not authenticated, please login.");
  ***REMOVED***
***REMOVED***

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
	.post(eventHandler.createEvent)// create a event (accessed at POST http://localhost:8080/api/events) -- remember to change back to authenticated.
	.get(auth, eventHandler.readAllEvents);// get all the events (accessed at GET http://localhost:8080/api/events)
	

router.route('/events/upcoming')
	.get(eventHandler.findAllUpcoming);

router.route('/events/status')
	.post(eventHandler.status)
	.get(eventHandler.status_get);

router.route('/events/poster/:event_id')
	.get(eventHandler.poster);
	
// on routes that end in /events/:event_id
// ----------------------------------------------------
router.route('/events/:event_id')
	.get(eventHandler.readEvent)// get the event with that id
	.put(auth, eventHandler.updateEvent)// update the event with this id
	.delete(auth, eventHandler.deleteEvent);// delete the event with this id
	
//
// on routes that end in /users
// ----------------------------------------------------
router.route('/login')
	.post(function (req, res){
		passport.authenticate('local', function (err, user, info){
			if (err) return res.json(err);
			if (!user) return res.json(info);

			req.login(user, function (err){
				console.log(err)
				if (err) return res.json(err);
				return res.json(user);
		***REMOVED***);

	***REMOVED***)(req, res);
***REMOVED***);

router.route('/logout')
	.get(function (req,res){
		req.logout();
		res.json({success:true***REMOVED***);
***REMOVED***)


router.route('/users')
	.post(userHandler.createUser);// create a user (accessed at POST http://localhost:8080/api/user)

// on routes that end in /users/:user_id
// ----------------------------------------------------
router.route('/users/:user_id')
	.get(auth, userHandler.readUser)// get the event with that id
	.put(auth, userHandler.updateUser)// update the event with this id
	.delete(auth,userHandler.deleteUser);	// delete the event with this id

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('uomsa-api running on ' + port);
