/**
 * Created with IntelliJ IDEA.
 * User: susmani
 * Date: 9/18/14
 * Time: 3:41 PM
 * To change this template use File | Settings | File Templates.
 */

app.utils.templates = (function() {

    var load = function(views, callback) {

        var deferreds = [];

        $.each(views, function(index, view) {
            if (app.views[view]) {
                console.log(view);
                deferreds.push($.get('tpl/' + view + '.html', function(data) {
                    app.views[view].prototype.template = _.template(data);
                ***REMOVED***, 'html'));
            ***REMOVED*** else {
                alert(view + " not found");
            ***REMOVED***
        ***REMOVED***);

        $.when.apply(null, deferreds).done(callback);
    ***REMOVED***

    // The public API
    return {
        load: load
    ***REMOVED***;

***REMOVED***());