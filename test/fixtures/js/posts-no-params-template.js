Template.postList.onCreated(function() {

    this.subscribe('posts');

});

Template.postList.helpers({

    postsItems: () => {
        return Posts.find();
    }

});
