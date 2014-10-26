var _e = require('../config').ENVIRONMENT;
console.log(_e);

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var crypto = require('crypto');
var _ = require('underscore');
var r = require('redis');
var redis = r.createClient(_e.redis.port, _e.redis.host, {auth_pass: _e.redis.pass***REMOVED*** );
var uuid = require('node-uuid');

//sadd api-keys 87fe3910-5978-11e4-8ed6-0800200c9a66
var apiKeys = ["87fe3910-5978-11e4-8ed6-0800200c9a66"]

var UserSchema   = new Schema({
	_id: String,
	firstname: String,
	lastname: String,
	password: String, 
	email: String,
	studentNumber: Number,
	key: String,
	going: [ { type: String, ref: 'Event' ***REMOVED*** ],
	maybe: [ { type: String, ref: 'Event' ***REMOVED*** ]
***REMOVED***);

var UserModel = mongoose.model('User', UserSchema);

exports.schema = UserSchema;

exports.createUser = function(req, res) {
	console.log(req.body);
	var userInstance = new UserModel();		// create a new instance of the member model
	userInstance._id = crypto.createHash('md5').update(req.body.studentNumber + (new Date).toString()).digest("hex");
	userInstance.firstname = req.body.firstname;  // set the members name (comes from the request)
	userInstance.lastname = req.body.lastname;
	userInstance.password = crypto.createHash('md5').update(req.body.password).digest("hex");
	userInstance.email = req.body.email;
	userInstance.studentNumber = req.body.studentNumber;

	userInstance.save(function(err) {
		if (err){
			res.json({
				message: err,
				success: false
		***REMOVED***);
	***REMOVED***
		res.json({ message: 'user created!', success:true , user:userInstance ***REMOVED***);
***REMOVED***);
***REMOVED***

// exports.f = function(req, res){
	
// ***REMOVED***

// exports.findMe = function(req,res){
// 	console.log(req.body);
// 	UserModel.findOne({email: req.body.email***REMOVED***, function(err, user) {
// 		if (err) res.json({message:err, success:false***REMOVED***);
		
// 		if (user && user.password === crypto.createHash('md5').update(req.body.password).digest("hex")){
// 			res.json({user: user, message:'Found User', success:false***REMOVED***);
// 	***REMOVED***
// 		else {
// 			res.json({message: 'Permission Denied', success:false***REMOVED***);
// 	***REMOVED***
// ***REMOVED***);
// ***REMOVED***

exports.readUser = function(req, res) {
	UserModel.findOne({_id: req.params.user_id***REMOVED***, function(err, user) {
		if (err)
			res.send(err);
		res.json(user);
***REMOVED***);
***REMOVED***

exports.updateUser = function(req, res) {

	UserModel.findOne({_id: req.params.user_id***REMOVED***, function(err, user) {
		if (err) res.json({message:err, success:false***REMOVED***);
		if (user.password === crypto.createHash('md5').update(req.body.password).digest("hex")){
			if (req.body.firstname) user.firstname = req.body.firstname;
			if (req.body.lastname)user.lastname = req.body.lastname;
			if (req.body.studentNumber)user.studentNumber = req.body.studentNumber;
			if (req.body.email)user.email = req.body.email;
			
			user.save(function(err) {
				if (err) res.json({message:err, success:false***REMOVED***);
				res.json({ message: 'user updated!', success:true ***REMOVED***);
		***REMOVED***);
	***REMOVED***
		else {
			res.json({message: 'Permission Denied', success:false***REMOVED***);
	***REMOVED***
		
***REMOVED***);
***REMOVED***

exports.deleteUser = function(req, res) {
	if (_.contains(keys, req.body.key)){
		UserModel.remove({
			_id: req.params.user_id
	***REMOVED*** function(err, user) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted user' ***REMOVED***);
	***REMOVED***);	
***REMOVED***
	else {
		res.json({message: "Permission Denied", success:false***REMOVED***);
***REMOVED***
***REMOVED***

exports.changePassword = function(req, res){
	UserModel.findOne({_id: req.params.user_id***REMOVED***, function(err, user){
		if (err) res.json({message:err, success:false***REMOVED***);
		if (user.password === crypto.createHash('md5').update(req.body.confirm_password).digest('hex')){
			user.password = crypto.createHash('md5').update(req.body.new_password).digest('hex');
			user.save(function(err){
				if(err) return res.json({message:err, success:false***REMOVED***);
				res.json({message:'Password changed successfully', success:true***REMOVED***);
		***REMOVED***);	
	***REMOVED***
		else {
			res.json({message: "Permission Denied", success:false***REMOVED***);		
	***REMOVED***
***REMOVED***);
***REMOVED***

// exports.authenticate = function (email, password, done){
//     pass = crypto.createHash('md5').update(password).digest("hex");

//     UserModel.findOne({'email':email***REMOVED***,function (err, item){
//     	if (err) return done(err);
//     	else if (item){
//     		if (pass == item.password){
//     			return done (null, {user: {
//                     firstname: item.firstname,
//                     lastname: item.lastname,
//                     email: item.email,
//                     hash: item.hash,
//                     studentid: item.studentNumber,
//                     key:item.key
//                 ***REMOVED***, message:"Successfully signed in", success:true***REMOVED***);
//     	***REMOVED***
//     		else done (null, false, {message: 'Incorrect Password', success:false ***REMOVED***);
//     ***REMOVED***
//     	else return done(null, false, {message:'Incorrect Username', success:false ***REMOVED***);
//     ***REMOVED***);
// ***REMOVED***;

exports.generateAccessToken = function(req, res){
	var email = req.body.email;
	var password = crypto.createHash('md5').update(req.body.password).digest("hex");
	var apikey = req.body.api_key;

	redis.sismember ('api-keys', apikey, function(err, exists){
		if (exists){
			UserModel.findOne({'email':email***REMOVED***,function (err, item){
				if (err) return res.json(err);
				if (item){
					if (password == item.password){
						//api key is legit, username and password checkout, create an access token in redis...
						var access_token = uuid.v1();
						redis.sadd('access-tokens', access_token);
						return res.json ({user: {
							firstname: item.firstname,
							lastname: item.lastname,
							email: item.email,
							_id: item._id,
							studentid: item.studentNumber,
							access_token: access_token
					***REMOVED*** message: "Successfully created access token.", success:true***REMOVED***);
				***REMOVED***
					else return res.json ({message: 'Incorrect Password', success:false ***REMOVED***);
			***REMOVED***
				else return res.json ({message:'Incorrect Username', success:false ***REMOVED***);
		***REMOVED***);
	***REMOVED***
		else {
			return res.json({message:'Invalid Api Key', success:false***REMOVED***);
	***REMOVED***
***REMOVED***);
***REMOVED***

exports.removeAccessToken = function(req, res){
	// console.log(req.body.access_token);
	redis.srem('access-tokens', req.body.access_token);
	return res.json("successfully signed out");
***REMOVED***

// exports.serialize = function (user, done){
//     done (null, user.user.hash);
// ***REMOVED***;

// exports.deserialize = function (hash, done){

// 	UserModel.findOne({'hash': hash***REMOVED***, function (err, item){
// 		done(err, item);
// ***REMOVED***);
// ***REMOVED***;
