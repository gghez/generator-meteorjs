Template.posts.onCreated(function() {

    this.autorun(() => {
        this.subscribe('posts', Template.currentData().params);
    });

});

Template.posts.helpers({

    postsItem: () => {
        return Posts.findOne({});
    }

});
