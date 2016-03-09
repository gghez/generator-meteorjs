Template.posts.onCreated(function() {

    this.subscribe('posts');

});

Template.posts.helpers({

    postsItems: () => {
        return Posts.find();
    }

});
