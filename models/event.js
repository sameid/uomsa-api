var fs 			 = require('fs');
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var crypto = require('crypto');
var gm = require('googlemaps');

var CONSTANTS = {
	STATUS_GOING: 'going',
	STATUS_MAYBE: 'maybe',
	STATUS_NOT_GOING: 'not-going'
***REMOVED***

var EventSchema   = new Schema({
	hash: String,
	title: String,
	description: String,
	address: String,
	location: {
		lng: Number,
		lat: Number
***REMOVED***
	created: {
		type:Date, 
		default: Date.now
***REMOVED***
	date: Date,
	startTime: String,
	endTime: String,
	going : [String],
	maybe: [String],
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

	gm.geocode(eventInstance.address, function (err, results){

		if (err){
			eventInstance.location.lat = 0;
			eventInstance.location.lng = 0;
	***REMOVED***
		else {
			eventInstance.location.lat = results.results[0].geometry.location.lat;
			eventInstance.location.lng = results.results[0].geometry.location.lng;
	***REMOVED***

		eventInstance.date = req.body.date;
		eventInstance.startTime = req.body.start;
		eventInstance.endTime = req.body.end;

		eventInstance.poster.data = fs.readFileSync(req.files.poster.path);
		eventInstance.poster.contentType = req.files.poster.mimetype;

		eventInstance.maybe.push('-');
		eventInstance.going.push('');

		// res.json(eventInstance);

		eventInstance.save(function(err){
			if (err)
				res.send(err);

			res.json({
				message: 'Event Successfully Created!'
		***REMOVED***)
	***REMOVED***);

***REMOVED***);

***REMOVED***

exports.status_get = function (req, res){
	console.log(req.query);
	EventModel.findOne({
		'hash':req.query.event_hash, 
***REMOVED*** function (err, eventInstance){
		if (err) res.send(err);

        var mi = eventInstance.maybe.indexOf(req.query.user_hash);
        var gi = eventInstance.going.indexOf(req.query.user_hash);
        if (mi > -1) {
        	res.json({
        		message:'User may be going.',
        		status:CONSTANTS.STATUS_MAYBE,
        		success:true
        ***REMOVED***);
        ***REMOVED***
        else if (gi > -1){
        	res.json({
        		message:'User is going to event.',
        		status:CONSTANTS.STATUS_GOING,
        		success:true
        ***REMOVED***);  	
        ***REMOVED***
        else {
        	res.json({
        		message:'User is not going.',
        		status:CONSTANTS.STATUS_NOT_GOING,
        		success:true
        ***REMOVED***)
        ***REMOVED***


***REMOVED***);
***REMOVED***

exports.status = function (req, res){

	EventModel.findOne({'hash':req.body.event_hash***REMOVED***, function (err, eventInstance) {
        if (err) res.send(err);
        if (req.body.status == CONSTANTS.STATUS_GOING){
        	var mi = eventInstance.maybe.indexOf(req.body.user_hash);
        	if (mi > -1)eventInstance.maybe.splice(mi, 1);

        	eventInstance.going.push(req.body.user_hash);
        	eventInstance.save(function (err){
        		if (err)
        			res.send(err);

        		res.json({
        			message:'Successfully added user ' + req.body.user_hash + ' going to event  ' + req.body.event_hash,
        			success: true
        	***REMOVED***);
        ***REMOVED***); 
        ***REMOVED***
        else if (req.body.status == CONSTANTS.STATUS_MAYBE){
        	var gi = eventInstance.going.indexOf(req.body.user_hash);
        	if (gi > -1)eventInstance.going.splice(gi, 1);

        	eventInstance.maybe.push(req.body.user_hash);
        	eventInstance.save(function (err){
        		if (err)
        			res.send(err);

        		res.json({
        			message:'Successfully added user ' + req.body.user_hash + ' maybe going to event ' + req.body.event_hash,
        			success: true
        	***REMOVED***);
        ***REMOVED***);

        ***REMOVED***
        else if (req.body.status == CONSTANTS.STATUS_NOT_GOING){
        	var gi = eventInstance.going.indexOf(req.body.user_hash);
        	if (gi > -1)eventInstance.going.splice(gi, 1);

        	var mi = eventInstance.maybe.indexOf(req.body.user_hash);
        	if (mi > -1)eventInstance.maybe.splice(mi, 1);	

        	res.json({
        		message:'User Removed from event.',
        		success:true
        ***REMOVED***);

        ***REMOVED***


        // res.contentType(eventInstance.poster.contentType);
        // res.send(eventInstance.poster.data);
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

exports.poster = function (req,res){
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

