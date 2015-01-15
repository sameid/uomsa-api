app.views.EventListView = Backbone.View.extend({

    initialize: function(){
        this.eventCollection = new app.models.EventCollection();
        // this.model.on("reset", this.render, this);
        // this.model.on("add", function(_event){
        //     that.$el.append(new app.views.EventListItemView({model:_event}).render().el);
        // });
    },

    render: function () {
        this.$el.html(this.template());
        var that = this;
        this.eventCollection.fetch({
            success: function(models){
                _.each(models.models, function(_event){
                    that.$('.events').append(new app.views.EventListItemView({model:_event}).render().el);
                }, that);

                that.$('.events').append("<div class='col-lg-2 col-sm-3 col-xs-4'>" +
                    "<button class='new-event btn' type='button' >" +
                    " +" +
                    "</button>" +
                    "</div>");
                return that;
            }
        });

    },

    events: {
        "click .new-event" : "createEvent",
        "click .event-item": "loadEvent"
    },

    createEvent: function(){
        var _event = new app.models.Event();
        $("#content").append(new app.views.EventView({model: _event}).el);
        $("#myModal").modal();
    },

    loadEvent: function(ev){
        var event_id = ev.currentTarget.id;
        var _event = new app.models.Event({_id:event_id});
        _event.fetch({
            success:function(_model){
                console.log(_model);
                $("#content").append(new app.views.EventView({model: _model}).el);
                $("#myModal").modal();
            }
        })

        // $("#content").append(new app.views.EventView({model: _event}).el);
        // $("#myModal").modal();

    }

});

app.views.EventListItemView = Backbone.View.extend({

    initialize: function(){
        this.model.on("change", this.render, this);
        this.model.on("destroy", this.close, this);
    },

    render: function(){
        var data = this.model.attributes
        this.$el.html(this.template(data));
        return this;
    }

});

app.views.EventView = Backbone.View.extend({
    initialize: function(){
        this.render();
    },

    render: function(){
        var data = this.model.attributes;
        this.$el.html(this.template(data));
        return this;
    }
})