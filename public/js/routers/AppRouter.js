/**
 * Created with IntelliJ IDEA.
 * User: susmani
 * Date: 9/18/14
 * Time: 3:38 PM
 * To change this template use File | Settings | File Templates.
 */

app.routers.AppRouter = Backbone.Router.extend({

    routes: {
        "": "events",
        "events": "events"
    ***REMOVED***,

    initialize: function () {
        app.shellView = new app.views.ShellView();
        $('body').html(app.shellView.render().el);

        this.$content = $("#content");
    ***REMOVED***,

    events: function () {
        // Since the home view never changes, we instantiate it and render it only once
        if (!app.eventListView) {
            app.eventListView = new app.views.EventListView();
            app.eventListView.render();
        ***REMOVED*** else {
            console.log('reusing home view');
            app.eventListView.delegateEvents(); // delegate events when the view is recycled
        ***REMOVED***
        this.$content.html(app.eventListView.el);
        app.shellView.selectMenuItem('events-menu');
    ***REMOVED***,

    eventView: function(){

    ***REMOVED***

***REMOVED***);
