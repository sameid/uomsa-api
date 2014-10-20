var Environment = require('./config').ENVIRONMENT;

var express	= require('express');

//Express Middleware
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var cors = require('cors');

var r = require('redis');
var redis = r.createClient(Environment.redis.port, Environment.redis.host, {auth_pass: Environment.redis.pass ? Environment.redis.pass : ''***REMOVED*** );

//Express
var app	= express();

//Passport Session Libs
// var passport = require('passport');
// var BasicStrategy = require('passport-http').BasicStrategy;
// var LocalStrategy = require('passport-local').Strategy;
// var RedisStore = require('connect-redis')(session);

//Middleware Instantiation
app.use(multer({uploadDir:'./uploads'***REMOVED***));
app.use(bodyParser({strict: false***REMOVED***));
app.use(cookieParser());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.static('./public'));
// app.use(session({
//     store: new RedisStore({
//         host: Environment.redis.host, 
//         port: Environment.redis.port
//     ***REMOVED***),
//     secret: 'd4t4b4s3',
//     cookie: {
//     	httpOnly: false
//     ***REMOVED***
// ***REMOVED***));

// app.use(passport.initialize());
// app.use(passport.session());


var port = process.env.PORT || 3000; // set our port

//DB Specific Handling
var mongoose = require('mongoose');
var eventHandler = require('./models/event');
var userHandler = require('./models/user');

var connection = mongoose.connect(Environment.mongo.connectString, function(err){
	if (err) console.log(err);
***REMOVED***); // connect to our database


//Passport Specific stuff
// passport.use(new BasicStrategy ({***REMOVED***, userHandler.authenticate));
// passport.use(new LocalStrategy(userHandler.authenticate));
// passport.serializeUser(userHandler.serialize);
// passport.deserializeUser(userHandler.deserialize);

// var auth = function (req, res, next) {
//   if (req.isAuthenticated()) { next(); ***REMOVED***
//   else {
//   	res.send("Your request was not authenticated, please login.");
//   ***REMOVED***
// ***REMOVED***

// var auth = function(){
// 	return passport.authenticate('basic', {session:false***REMOVED***);
// ***REMOVED***

var auth = function (req, res, next){
	redis.sismember('access-tokens', req.body.access_token, function(err, exists){
		if (err) res.send('Could not create connection to Redis.');
		if (exists) next();
		else {
			res.send('Invalid access-token provided.');
	***REMOVED***
***REMOVED***)
***REMOVED***

// ROUTES FOR OUR API
// =============================================================================
// create our router
var router = express.Router();

router.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	// res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	// res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	next();
***REMOVED***);

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'uomsa events api' ***REMOVED***);	
***REMOVED***);


router.route('/event')
	.post(eventHandler.createEvent)// create a event (accessed at POST http://localhost:8080/api/events) -- remember to change back to authenticated.
	.get(eventHandler.readAllEvents);// get all the events (accessed at GET http://localhost:8080/api/events)

router.route('/event/:event_id')
	.get(eventHandler.readEvent)// get the event with that id
	.put(eventHandler.updateEvent)// update the event with this id
	.delete(eventHandler.deleteEvent);// delete the event with this id

router.route('/event/:event_id/poster')
	.get(eventHandler.poster);	

router.route('/upcomingEvents')
	.get(eventHandler.findAllUpcoming);

router.route('/event/upcoming/user/:user_id')
	.get(eventHandler.findAllAttending)

router.route('/event/:event_id/user/:user_id/')
	.get(eventHandler.findEventStatusByUser)
	.post(eventHandler.addUserToEvent)
	.delete(eventHandler.removeUserFromEvent)

// router.route('/events/status/:event_hash/:user_hash')
// 	.get(eventHandler.status_get);

// router.route('/events/status')
// 	.post(eventHandler.status);

router.route('/user')
	.post(userHandler.createUser);// create a user (accessed at POST http://localhost:8080/api/user)

router.route('/user/:user_id')
	.get(userHandler.readUser)// get the event with that id
	.put(userHandler.updateUser)// update the event with this id
	.delete(userHandler.deleteUser);	// delete the event with this id

router.route('/login')
	.post(userHandler.accessToken);

// router.route('/users/_P/:user_id')
// 	.post(userHandler.changePassword);

// router.route('/login')
// 	.post(function (req, res){
// 		passport.authenticate('local', function (err, user, info){
// 			if (err) return res.json(err);
// 			if (!user) return res.json(info);

// 			req.login(user, function (err){
// 				console.log(err)
// 				if (err) return res.json(err);
// 				return res.json(user);
// 		***REMOVED***);

// 	***REMOVED***)(req, res);
// ***REMOVED***);

// router.route('/logout')
// 	.get(function (req,res){
// 		req.logout();
// 		res.json({success:true***REMOVED***);
// ***REMOVED***)



// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('uomsa-api running on ' + port);
