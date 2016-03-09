Template.postList.onCreated(function() {

    this.subscribe('theposts');

});

Template.postList.helpers({

    thepostsItems: () => {
        return Theposts.find();
    }

});
