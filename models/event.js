var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EventSchema   = new Schema({
	name: String,
	location: String,
	thumbnail: String
***REMOVED***);

var EventModel = mongoose.model('Event', EventSchema);

exports.createEvent = function(req, res) {
	var eventInstance = new EventModel();		// create a new instance of the event model
	eventInstance.name = req.body.name;  // set the events name (comes from the request)
	eventInstance.save(function(err) {
		if (err)
			res.send(err);
		res.json({ message: 'Event created!' ***REMOVED***);
***REMOVED***);
***REMOVED***

exports.readAllEvents = function(req, res) {
	EventModel.find(function(err, events) {
		if (err)
			res.send(err);
		res.json(events);
***REMOVED***);
***REMOVED***

exports.readEvent = function(req, res) {
	EventModel.findById(req.params.event_id, function(err, eventInstance) {
		if (err)
			res.send(err);
		res.json(eventInstance);
***REMOVED***);
***REMOVED***

exports.updateEvent = function(req, res) {
	EventModel.findById(req.params.event_id, function(err, eventInstance) {

		if (err)
			res.send(err);

		eventInstance.name = req.body.name;
		eventInstance.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'event updated!' ***REMOVED***);
	***REMOVED***);
***REMOVED***);
***REMOVED***

exports.deleteEvent = function(req, res) {
	EventModel.remove({
		_id: req.params.event_id
***REMOVED*** function(err, eventInstance) {
		if (err)
			res.send(err);

		res.json({ message: 'Successfully deleted' ***REMOVED***);
***REMOVED***);
***REMOVED***



//CRUD

