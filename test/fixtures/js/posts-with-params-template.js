Template.onePost.onCreated(function() {

    this.autorun(() => {
        this.subscribe('posts', Template.currentData().params);
    });

});

Template.onePost.helpers({

    postsItem: () => {
        return Posts.findOne({});
    }

});
