Template.posts.onCreated(function() {

    this.autorun(() => {
        this.subscribe('theposts', Template.currentData().params);
    });

});

Template.posts.helpers({

    thepostsItems: () => {
        return Theposts.findOne({});
    }

});
