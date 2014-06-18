var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
	firstname: String,
	lastname: String,
	username: String,
	password: String, 
	email: String
***REMOVED***);

var UserModel = mongoose.model('User', MemberSchema);

exports.createUser = function(req, res) {
	var userInstance = new UserModel();		// create a new instance of the member model
	userInstance.name = req.body.name;  // set the members name (comes from the request)
	userInstance.save(function(err) {
		if (err)
			res.send(err);

		res.json({ message: 'user created!' ***REMOVED***);
***REMOVED***);
***REMOVED***

exports.readUser = function(req, res) {
	UserModel.findById(req.params.user_id, function(err, user) {
		if (err)
			res.send(err);
		res.json(user);
***REMOVED***);
***REMOVED***

exports.updateUser = function(req, res) {
	UserModel.findById(req.params.user_id, function(err, user) {
		if (err)
			res.send(err);

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
		_id: req.params.event_id
***REMOVED*** function(err, user) {
		if (err)
			res.send(err);

		res.json({ message: 'Successfully deleted user' ***REMOVED***);
***REMOVED***);
***REMOVED***
