var fs 			 = require('fs');
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
	date: Date,
	startTime: String,
	endTime: String,
	usersAttending : Array,
	poster: {
		data: Buffer,
		contentType: String
***REMOVED***
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
	***REMOVED***)
***REMOVED***);
***REMOVED***

exports.findAllUpcoming = function (req, res){
	EventModel
		.find()
	 	.where('date').gt(new Date())
		.select("hash title description address date startTime endTime created usersAttending")
		.exec(function (err, events){
			if (err)res.send(err);
			res.json({data:events, success:true***REMOVED***);
	***REMOVED***);
***REMOVED***

exports.findPoster = function (req,res){
	EventModel.findOne({'hash':req.params.event_id***REMOVED***, function (err, eventInstance) {
        if (err) return next(err);
        res.contentType(eventInstance.poster.contentType);
        res.send(eventInstance.poster.data);
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
		eventInstance.poster = {***REMOVED***;
		res.json({data:eventInstance, success:true***REMOVED***);
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

