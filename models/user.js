var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var crypto = require('crypto');

var UserSchema   = new Schema({
	hash: String,
	firstname: String,
	lastname: String,
	password: String, 
	email: String,
	studentNumber: Number
***REMOVED***);

var UserModel = mongoose.model('User', UserSchema);

exports.schema = UserSchema;

exports.createUser = function(req, res) {
	var userInstance = new UserModel();		// create a new instance of the member model
	userInstance.hash = crypto.createHash('md5').update(req.body.studentNumber + (new Date).toString()).digest("hex");
	userInstance.firstname = req.body.firstname;  // set the members name (comes from the request)
	userInstance.lastname = req.body.lastname;
	userInstance.password = crypto.createHash('md5').update(req.body.password).digest("hex");
	userInstance.email = req.body.email;
	userInstance.studentNumber = req.body.studentNumber;

	userInstance.save(function(err) {
		if (err)
			res.send(err);

		res.json({ message: 'user created!' ***REMOVED***);
***REMOVED***);
***REMOVED***

exports.readUser = function(req, res) {
	UserModel.findOne({hash: req.params.user_id***REMOVED***, function(err, user) {
		if (err)
			res.send(err);
		res.json(user);
***REMOVED***);
***REMOVED***

exports.updateUser = function(req, res) {
	UserModel.findOne({hash: req.params.hash***REMOVED***, function(err, user) {
		if (err)
			res.send(err);
		/*
		* Add more user attributes when updating	
		*/
		user.name = req.body.name;
		user.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'user updated!' ***REMOVED***);
	***REMOVED***);
***REMOVED***);
***REMOVED***

exports.deleteUser = function(req, res) {
	UserModel.remove({
		hash: req.params.hash
***REMOVED*** function(err, user) {
		if (err)
			res.send(err);

		res.json({ message: 'Successfully deleted user' ***REMOVED***);
***REMOVED***);
***REMOVED***

exports.authenticate = function (email, password, done){
    pass = crypto.createHash('md5').update(password).digest("hex");

    UserModel.findOne({'email':email***REMOVED***,function (err, item){
    	if (err) return done(err);
    	else if (item){
    		if (pass == item.password){
    			return done (null, {user: {
                    firstname: item.firstname,
                    lastname: item.lastname,
                    email: item.email,
                    hash: item.hash,
                    studentid: item.studentNumber
                ***REMOVED***, message:"Successfully signed in", success:true***REMOVED***);
    	***REMOVED***
    		else done (null, false, {message: 'Incorrect Password', success:false ***REMOVED***);
    ***REMOVED***
    	else return done(null, false, {message:'Incorrect Username', success:false ***REMOVED***);
    ***REMOVED***);
***REMOVED***;

exports.serialize = function (user, done){
    done (null, user.user.hash);
***REMOVED***;

exports.deserialize = function (hash, done){

	UserModel.findOne({'hash': hash***REMOVED***, function (err, item){
		done(err, item);
***REMOVED***);
***REMOVED***;
