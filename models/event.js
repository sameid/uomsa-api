
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var crypto = require('crypto');

var EventSchema   = new Schema({
	hash: String,
	title: String,
	description: String,
	address: String,
	location: {
		longitude: Number,
		latitude: Number
***REMOVED***
	created: {
		type:Date, 
		default: Date.now
***REMOVED***
	usersAttending : Array,
	images: Array,
	mainImg: { data: Buffer, contentType: String ***REMOVED***
***REMOVED***);


var EventModel = mongoose.model('Event', EventSchema);

//Will be used mainly in the Admin console
exports.createEvent = function(req, res) {
	var eventInstance = new EventModel();		// create a new instance of the event model

	eventInstance.hash = crypto.createHash('md5').update(req.body.title + (new Date).toString()).digest("hex");
	eventInstance.title = req.body.title;  // set the events name (comes from the request)
	eventInstance.description = req.body.description;
	eventInstance.address = req.body.address;
	//calculate longitude and latitude
	date = req.body.date;
	images = req.body.images;
	mainImg = req.body.mainImg;

	eventInstance.save(function(err) {
		if (err)
			res.send(err);

		res.json({ message: 'Event created!' ***REMOVED***);
***REMOVED***);

***REMOVED***

exports.readAllEvents = function(req, res) {
	EventModel.find(function(err, events) {
		if (err)res.send(err);

		res.json(events);
***REMOVED***);
***REMOVED***

exports.readEvent = function(req, res) {
	console.log('test');
	EventModel.findOne({'hash':req.params.event_id***REMOVED***, function(err, eventInstance) {
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

