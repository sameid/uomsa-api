app.views.ShellView = Backbone.View.extend({

    initialize: function(){
      
    ***REMOVED***,

    render: function () {
        this.$el.html(this.template());
        return this;
    ***REMOVED***,

    selectMenuItem: function(menuItem) {
        console.log(menuItem);
        $('.navbar .nav li').removeClass('active');
        if (menuItem) {
            $('.' + menuItem).addClass('active');
        ***REMOVED***
    ***REMOVED***

***REMOVED***);