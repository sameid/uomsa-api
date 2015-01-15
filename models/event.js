var fs 			 = require('fs');
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var crypto = require('crypto');
var gm = require('googlemaps');
var _ = require('underscore');

var EventSchema   = new Schema({
	_id: String,
	title: String,
	description: String,
	address: String,
	location: {
		lng: Number,
		lat: Number
	},
	created: {
		type:Date, 
		default: Date.now
	},
	date: Date,
	startTime: String,
	endTime: String,
	going : [ { type: Schema.Types.ObjectId, ref: 'User' } ],
	maybe : [ { type: Schema.Types.ObjectId, ref: 'User' } ],
	poster: {
		data: Buffer,
		contentType: String
	}
});


var EventModel = mongoose.model('Event', EventSchema);

//Will be used mainly in the Admin console
exports.createEvent = function(req, res) {

	var eventInstance = new EventModel();		// create a new instance of the event model

	eventInstance._id = crypto.createHash('md5').update(req.body.title + (new Date).toString()).digest("hex");
	eventInstance.title = req.body.title;  // set the events name (comes from the request)
	eventInstance.description = req.body.description;
	eventInstance.address = req.body.address;

	gm.geocode(eventInstance.address, function (err, results){

		if (err){
			eventInstance.location.lat = 0;
			eventInstance.location.lng = 0;
		}
		else {
			eventInstance.location.lat = results.results[0].geometry.location.lat;
			eventInstance.location.lng = results.results[0].geometry.location.lng;
		}

		eventInstance.date = req.body.date;
		eventInstance.startTime = req.body.start;
		eventInstance.endTime = req.body.end;

		eventInstance.poster.data = fs.readFileSync(req.files.poster.path);
		eventInstance.poster.contentType = req.files.poster.mimetype;

		// res.json(eventInstance);

		eventInstance.save(function(err){
			if (err)
				res.send(err);

			res.json({
				message: 'Event Successfully Created!'
			})
		});

	});

}

exports.addUserToEvent = function(req, res){
	EventModel.findOne( {_id: req.body.event_id} , function(err, eventInstance){
		if (err)res.send(err);
		eventInstance.going.push(req.body.user_id);
		eventInstance.save(function(err){
			if (err) res.send(err);
			res.send('Successfully added user to event.');
		});
	});
} 

exports.removeUserFromEvent = function(req, res){
	EventModel.findOne( {_id: req.body.event_id}, function(err, eventInstance){
		if (err) res.send(err);
		EventModel.findOneAndUpdate({userId: userId}, {$pull: {alerts: {_id: alertId}}}).exec();

	});
}

exports.status = function (req, res){
	EventModel.findOne({_id:req.body.event_id}, function (err, eventInstance) {
        if (err) res.send(err);



        var mi = eventInstance.maybe.indexOf(req.body.user_id);
        var gi = eventInstance.going.indexOf(req.body.user_id);
        if (mi > -1)eventInstance.maybe.splice(mi, 1);
        if (gi > -1)eventInstance.going.splice(gi, 1);

        if (req.body.status == CONSTANTS.STATUS_GOING){
        	eventInstance.going.push(req.body.user_hash);
        	eventInstance.save(function (err){
        		if (err)res.send(err);
        		res.json({message:'Successfully added user ' + req.body.user_hash + ' going to event  ' + req.body.event_hash});
        	}); 
        }
        else if (req.body.status == CONSTANTS.STATUS_MAYBE){
        	eventInstance.maybe.push(req.body.user_hash);
        	eventInstance.save(function (err){
        		if (err)res.send(err);
        		res.json({message:'Successfully added user ' + req.body.user_hash + ' maybe going to event ' + req.body.event_hash});
        	});

        }
        else if (req.body.status == CONSTANTS.STATUS_NOT_GOING){
        	eventInstance.save(function(err){
        		if (err)res.send(err);
        		res.json({message:'User Removed from event.'});
        	});
        }
    });
}

exports.findAllUpcoming = function (req, res){
	EventModel
		.find()
	 	.where('date').gt(new Date())
		.select("_id title description address date startTime endTime created")
		.exec(function (err, events){
			if (err)res.send(err);
			res.json(events);
		});
}

exports.findAllAttending = function(req, res){
	EventModel
		.find()
		.where('going').in([req.params.user_id])
		.sort('date')
		.select("_id title description address date startTime endTime created")
		.exec(function(err, events){
			if (err) res.send(err);
			console.log(events);
			res.json(events);
		});

}

exports.poster = function (req,res){
	EventModel.findOne({_id:req.params.event_id}, function (err, eventInstance) {
        if (err) return next(err);
        res.contentType(eventInstance.poster.contentType);
        res.send(eventInstance.poster.data);
    });
}

exports.readAllEvents = function(req, res) {
	EventModel
	.find()
	.select("_id title description address date startTime endTime created")
	.exec(function(err, events) {
		if (err)res.send(err);

		res.json(events);
	});
}

exports.readEvent = function(req, res) {
	console.log('test');
	EventModel.findOne({_id:req.params.event_id}, function(err, eventInstance) {
		if (err)
			res.send(err);
		eventInstance.poster = {};
		res.json(eventInstance);
	});
}

exports.updateEvent = function(req, res) {
	EventModel.findById(req.params.event_id, function(err, eventInstance) {

		if (err)
			res.send(err);

		eventInstance.name = req.body.name;
		eventInstance.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'event updated!' });
		});
	});
}

exports.deleteEvent = function(req, res) {
	EventModel.remove({
		_id: req.params.event_id
	}, function(err, eventInstance) {
		if (err)
			res.send(err);

		res.json({ message: 'Successfully deleted' });
	});
}



//CRUD

