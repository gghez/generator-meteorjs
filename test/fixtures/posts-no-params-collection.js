Template.posts.onCreated(function() {

    this.subscribe('theposts');

});

Template.posts.helpers({

    thepostsItems: () => {
        return Theposts.find();
    }

});
