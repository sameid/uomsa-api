app.views.ShellView = Backbone.View.extend({

    initialize: function(){
      
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    },

    selectMenuItem: function(menuItem) {
        console.log(menuItem);
        $('.navbar .nav li').removeClass('active');
        if (menuItem) {
            $('.' + menuItem).addClass('active');
        }
    }

});