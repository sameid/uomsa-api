var fs 			 = require('fs');
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var crypto = require('crypto');

var StatusSchema   = new Schema({
	_id: String,
	event_id: String,
	user_id: String,
	type: String
***REMOVED***);

var StatusModel = mongoose.model('Status', StatusSchema);

exports.createStatus = function(req, res){
	StatusModel.remove({user_id:req.body.user_id, event_id:req.body.event_id***REMOVED***, function(err, statusInstance) {
		if (err)res.send(err);
		var statusInstance = new StatusModel();

		statusInstance._id = crypto.createHash('md5').update((new Date).toString()).digest("hex")
		statusInstance.user_id = req.body.user_id;
		statusInstance.event_id = req.body.event_id;
		statusInstance.type = req.body.type;

		statusInstance.save(function(err){
			if (err)res.send(err);

			res.json({
				message: 'Status Created Successfully'
		***REMOVED***);
	***REMOVED***);
***REMOVED***);
***REMOVED***

exports.readAllStatuses = function(req, res){

	StatusModel
		.find()
		.select("_id event_id user_id type")
		.exec(function(err, statuses){
			if (err) res.send(err);
			if (statuses) res.json(statuses);
			else res.json({message: "not statuses"***REMOVED***);
	***REMOVED***);
***REMOVED***

exports.readStatus = function(req, res) {
	StatusModel.findOne({_id:req.params.status_id***REMOVED***, function(err, statusInstance) {
		if (err)res.send(err);
		if (statusInstance){
			res.json(statusInstance);	
	***REMOVED***
		else{
			res.json('status not found');
	***REMOVED***
***REMOVED***);
***REMOVED***

exports.updateStatus = function(req, res) {
	StatusModel.findById(req.params.status_id, function(err, statusInstance) {
		if (err)res.send(err);
		if (statusInstance){
			statusInstance.type = req.body.type;
			statusInstance.save(function(err) {
				if (err)res.send(err);
				res.json({ message: 'status updated!' ***REMOVED***);
		***REMOVED***);	
	***REMOVED***
		else {
			res.json({message:'status not found'***REMOVED***);
	***REMOVED***
***REMOVED***);
***REMOVED***

exports.deleteStatus = function(req, res) {
	StatusModel.remove({_id: req.params.status_id***REMOVED***, function(err, statusInstance) {
		if (err)res.send(err);
		if (statusInstance) res.json({ message: 'Successfully deleted status' ***REMOVED***);
		else res.json({message:'status not found'***REMOVED***);
***REMOVED***);
***REMOVED***

exports.findStatusByEventAndUser = function (req, res){
	StatusModel.findOne({user_id:req.params.user_id, event_id:req.params.event_id***REMOVED***, function(err, statusInstance) {
		if (err)res.send(err);
		if (statusInstance){
			res.json(statusInstance);	
	***REMOVED***
		else{
			res.json(null);
	***REMOVED***
***REMOVED***);

***REMOVED***
exports.deleteStatusByEventAndUser = function (req, res){
	StatusModel.remove({user_id:req.params.user_id, event_id:req.params.event_id***REMOVED***, function(err, statusInstance) {
		if (err)res.send(err);
		if (statusInstance) res.json({ message: 'Successfully deleted status' ***REMOVED***);
		else res.json({message:'status not found'***REMOVED***);
***REMOVED***);

***REMOVED***