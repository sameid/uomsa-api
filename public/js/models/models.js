/*
    If you are using the sample RESTFul services I published on GitHub, use the following URLs...

      - For the Node.js sample backend (available in https://github.com/ccoenraets/directory-rest-nodejs)
        Use: http://localhost:3000/employees

      - For the PHP sample backend (available in https://github.com/ccoenraets/directory-rest-php)
        Use: /directory-rest-php/employees

 */

app.models.Event = Backbone.Model.extend({
    urlRoot:"http://localhost:3000/api/event",
    idAttribute:"_id"

***REMOVED***);

app.models.EventCollection = Backbone.Collection.extend({
    model: app.models.Event,
    url:"http://localhost:3000/api/event"
***REMOVED***);

// var originalSync = Backbone.sync;
// Backbone.sync = function (method, model, options) {
//     if (method === "read") {
//         options.dataType = "jsonp";
//         return originalSync.apply(Backbone, arguments);
//     ***REMOVED***

// ***REMOVED***;