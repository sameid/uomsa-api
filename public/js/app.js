var app = {
    views: {***REMOVED***,
    models: {***REMOVED***,
    routers: {***REMOVED***,
    utils: {***REMOVED***,
    adapters: {***REMOVED***
***REMOVED***;

$(document).on("ready", function () {
    app.utils.templates.load(["ShellView","EventListView", "EventListItemView", "EventView"],
        function () {
            app.router = new app.routers.AppRouter();
            Backbone.history.start();
        ***REMOVED***);
***REMOVED***);



