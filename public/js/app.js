var app = {
    views: {},
    models: {},
    routers: {},
    utils: {},
    adapters: {}
};

$(document).on("ready", function () {
    app.utils.templates.load(["ShellView","EventListView", "EventListItemView", "EventView"],
        function () {
            app.router = new app.routers.AppRouter();
            Backbone.history.start();
        });
});



