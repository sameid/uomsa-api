var fs 			 = require('fs');
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var crypto = require('crypto');
var EventModel = require('./event').EventModel;
var async = require('async');

var StatusSchema   = new Schema({
	_id: String,
	event_id: String,
	user_id: String,
	type: String
});

var StatusModel = mongoose.model('Status', StatusSchema);

exports.createStatus = function(req, res){
	StatusModel.remove({user_id:req.body.user_id, event_id:req.body.event_id}, function(err, statusInstance) {
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
			});
		});
	});
}

exports.readAllStatuses = function(req, res){

	StatusModel
		.find()
		.select("_id event_id user_id type")
		.exec(function(err, statuses){
			if (err) res.send(err);
			if (statuses) res.json(statuses);
			else res.json({message: "not statuses"});
		});
}

exports.readStatus = function(req, res) {
	StatusModel.findOne({_id:req.params.status_id}, function(err, statusInstance) {
		if (err)res.send(err);
		if (statusInstance){
			res.json(statusInstance);	
		}
		else{
			res.json('status not found');
		}
	});
}

exports.updateStatus = function(req, res) {
	StatusModel.findById(req.params.status_id, function(err, statusInstance) {
		if (err)res.send(err);
		if (statusInstance){
			statusInstance.type = req.body.type;
			statusInstance.save(function(err) {
				if (err)res.send(err);
				res.json({ message: 'status updated!' });
			});	
		}
		else {
			res.json({message:'status not found'});
		}
	});
}

exports.deleteStatus = function(req, res) {
	StatusModel.remove({_id: req.params.status_id}, function(err, statusInstance) {
		if (err)res.send(err);
		if (statusInstance) res.json({ message: 'Successfully deleted status' });
		else res.json({message:'status not found'});
	});
}

exports.findStatusByEventAndUser = function (req, res){
	StatusModel.findOne({user_id:req.params.user_id, event_id:req.params.event_id}, function(err, statusInstance) {
		if (err)res.send(err);
		if (statusInstance){
			res.json(statusInstance);	
		}
		else{
			res.json(null);
		}
	});

}
exports.deleteStatusByEventAndUser = function (req, res){
	StatusModel.remove({user_id:req.params.user_id, event_id:req.params.event_id}, function(err, statusInstance) {
		if (err)res.send(err);
		if (statusInstance) res.json({ message: 'Successfully deleted status' });
		else res.json({message:'status not found'});
	});

}

exports.attending = function(req, res){
	var user_id = req.params.user_id
	StatusModel		
		.find()
		.where('user_id').equals(user_id)
		.select("event_id")
		.exec(function(err, statuses){
			if (err) res.send(err);
			if (statuses){

				async.map(statuses, function(item, callback){
					callback(null, item.event_id)
				}, function (err, results){
					EventModel
						.find()
						.where('_id').in(results)
						.select("_id title")
						.exec(function(err, events){
							res.json(events);
						});
				});

			}
			else res.json({message: "not statuses"});
		});
}